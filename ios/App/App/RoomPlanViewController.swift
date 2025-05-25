// RoomPlanViewController.swift
import UIKit
import RoomPlan
import Capacitor

@available(iOS 17.0, *)
class RoomPlanViewController: UIViewController, RoomCaptureViewDelegate {
    
    private let roomCaptureView = RoomCaptureView()
    private var completion: ((CapturedRoom?, Error?) -> Void)?
    
    init(completion: @escaping (CapturedRoom?, Error?) -> Void) {
        self.completion = completion
        super.init(nibName: nil, bundle: nil)
        
        // full screen
        self.modalPresentationStyle = .fullScreen
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupRoomCapture()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        startCapture()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        roomCaptureView.captureSession.stop()
    }
    
    override var prefersStatusBarHidden: Bool {
        return false
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    
    private func setupUI() {
        view.backgroundColor = .black
        
        // Add room capture view
        view.addSubview(roomCaptureView)
        roomCaptureView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            roomCaptureView.topAnchor.constraint(equalTo: view.topAnchor),
            roomCaptureView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            roomCaptureView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            roomCaptureView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        
        // Create top status bar background
        let statusBarBackground = UIView()
        statusBarBackground.backgroundColor = UIColor.black
        view.addSubview(statusBarBackground)
        statusBarBackground.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            statusBarBackground.topAnchor.constraint(equalTo: view.topAnchor),
            statusBarBackground.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            statusBarBackground.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            statusBarBackground.heightAnchor.constraint(equalToConstant: 44)
        ])
        
        // Back button on navigator
        let backButton = UIButton(type: .system)
        backButton.setTitle("← Back", for: .normal)
        backButton.setTitleColor(.white, for: .normal)
        backButton.titleLabel?.font = UIFont.systemFont(ofSize: 17)
        backButton.backgroundColor = UIColor(white: 1.0, alpha: 0.2)
        backButton.layer.cornerRadius = 8
        backButton.contentEdgeInsets = UIEdgeInsets(top: 6, left: 12, bottom: 6, right: 12)
        backButton.addTarget(self, action: #selector(cancelTapped), for: .touchUpInside)
        
        view.addSubview(backButton)
        backButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            backButton.centerYAnchor.constraint(equalTo: statusBarBackground.centerYAnchor),
            backButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 12)
        ])
        
        // Bottom card with buttons
        let bottomCard = UIView()
        bottomCard.backgroundColor = .white
        bottomCard.layer.cornerRadius = 20
        bottomCard.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        bottomCard.layer.shadowColor = UIColor.black.cgColor
        bottomCard.layer.shadowOffset = CGSize(width: 0, height: -2)
        bottomCard.layer.shadowOpacity = 0.1
        bottomCard.layer.shadowRadius = 10
        
        view.addSubview(bottomCard)
        bottomCard.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            bottomCard.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            bottomCard.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            bottomCard.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            bottomCard.heightAnchor.constraint(equalToConstant: 220)
        ])
        
        // Home indicator
        let homeIndicator = UIView()
        homeIndicator.backgroundColor = UIColor(white: 0.9, alpha: 1.0)
        homeIndicator.layer.cornerRadius = 2.5
        
        bottomCard.addSubview(homeIndicator)
        homeIndicator.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            homeIndicator.topAnchor.constraint(equalTo: bottomCard.topAnchor, constant: 10),
            homeIndicator.centerXAnchor.constraint(equalTo: bottomCard.centerXAnchor),
            homeIndicator.widthAnchor.constraint(equalToConstant: 36),
            homeIndicator.heightAnchor.constraint(equalToConstant: 5)
        ])
        
        // Start story scan button
        let startButton = UIButton(type: .system)
        startButton.setTitle("Start story scan", for: .normal)
        startButton.setTitleColor(.white, for: .normal)
        startButton.backgroundColor = UIColor(red: 50/255, green: 215/255, blue: 75/255, alpha: 1.0) // iOS green
        startButton.layer.cornerRadius = 14
        startButton.titleLabel?.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
        startButton.addTarget(self, action: #selector(startScanTapped), for: .touchUpInside)
        
        bottomCard.addSubview(startButton)
        startButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            startButton.topAnchor.constraint(equalTo: homeIndicator.bottomAnchor, constant: 25),
            startButton.leadingAnchor.constraint(equalTo: bottomCard.leadingAnchor, constant: 20),
            startButton.trailingAnchor.constraint(equalTo: bottomCard.trailingAnchor, constant: -20),
            startButton.heightAnchor.constraint(equalToConstant: 56)
        ])
        
        // Cancel button
        let cancelButton = UIButton(type: .system)
        cancelButton.setTitle("Cancel", for: .normal)
        cancelButton.setTitleColor(UIColor(red: 255/255, green: 59/255, blue: 48/255, alpha: 1.0), for: .normal)
        cancelButton.titleLabel?.font = UIFont.systemFont(ofSize: 17)
        cancelButton.addTarget(self, action: #selector(cancelTapped), for: .touchUpInside)
        
        bottomCard.addSubview(cancelButton)
        cancelButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            cancelButton.topAnchor.constraint(equalTo: startButton.bottomAnchor, constant: 10),
            cancelButton.centerXAnchor.constraint(equalTo: bottomCard.centerXAnchor),
            cancelButton.heightAnchor.constraint(equalToConstant: 44)
        ])
    }
    
    private func setupRoomCapture() {
        roomCaptureView.delegate = self
    }
    
    private func startCapture() {
        let configuration = RoomCaptureSession.Configuration()
        roomCaptureView.captureSession.run(configuration: configuration)
    }
    
    @objc private func startScanTapped() {
        // The scan is already running, this would typically save/process
        roomCaptureView.captureSession.stop()
    }
    
    @objc private func cancelTapped() {
        dismiss(animated: true) {
            self.completion?(nil, nil)
        }
    }
    
    // MARK: - RoomCaptureViewDelegate
    
    func captureView(shouldPresent roomDataForProcessing: CapturedRoomData, error: Error?) -> Bool {
        return true
    }
    
    func captureView(didPresent processedResult: CapturedRoom, error: Error?) {
        dismiss(animated: true) {
            self.completion?(error == nil ? processedResult : nil, error)
        }
    }
}
