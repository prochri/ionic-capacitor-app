import ARKit
import Capacitor
import RoomPlan
import WebKit

@available(iOS 17.0, *)
@objc(RoomPlanPlugin)
public class RoomPlanPlugin: CAPPlugin {
    private var roomCaptureView: RoomCaptureView?
    private var roomCaptureSession: RoomCaptureSession?
    private var captureDelegate: RoomCaptureDelegateImpl?

    // Add this to verify the plugin loads
    public override func load() {
        super.load()
        print("⚡️ RoomPlanPlugin loaded successfully")
    }

    @objc func checkSupport(_ call: CAPPluginCall) {
        print("⚡️ checkSupport called")
        if #available(iOS 17.0, *) {
            let supported = RoomCaptureSession.isSupported
            print("⚡️ RoomPlan supported: \(supported)")
            call.resolve([
                "supported": supported
            ])
        } else {
            print("⚡️ iOS version too low for RoomPlan")
            call.resolve([
                "supported": false
            ])
        }
    }

    @objc func startRoomCapture(_ call: CAPPluginCall) {
        print("⚡️ startRoomCapture called")
        PassthroughWebView.passthroughAllowed = true
        if #available(iOS 17.0, *) {
            DispatchQueue.main.async { [weak self] in
                guard let self = self else {
                    call.reject("Plugin instance not available")
                    return
                }

                // Create and configure RoomCaptureView
                let roomCaptureView = RoomCaptureView()
                self.roomCaptureView = roomCaptureView

                // Make the webview background transparent to show the camera
                if let webView = self.bridge?.webView {
                    webView.isOpaque = false
                    webView.backgroundColor = UIColor.clear
                    webView.scrollView.backgroundColor = UIColor.clear
                    webView.scrollView.isOpaque = false

                    // Also make the superview transparent if it exists
                    if let superView = webView.superview {
                        superView.backgroundColor = UIColor.clear
                        superView.isOpaque = false

                        // Make all parent views transparent
                        var parentView = superView.superview
                        while parentView != nil {
                            parentView?.backgroundColor = UIColor.clear
                            parentView?.isOpaque = false
                            parentView = parentView?.superview
                        }
                    }
                }

                // Set up the delegate
                let delegate = RoomCaptureDelegateImpl { [weak self] roomData, error in
                    guard let self = self else { return }

                    if let error = error {
                        print("⚡️ Room capture error: \(error)")
                        self.notifyWebView(
                            event: "roomCaptureError", data: ["error": error.localizedDescription])
                    } else if let roomData = roomData {
                        // Send room data updates to webview
                        do {
                            let encoder = JSONEncoder()
                            let data = try encoder.encode(roomData)
                            if let jsonString = String(data: data, encoding: .utf8) {
                                self.notifyWebView(
                                    event: "roomCaptureUpdate", data: ["room": jsonString])
                            }
                        } catch {
                            print("⚡️ Error encoding room data: \(error)")
                        }
                    }
                }

                self.captureDelegate = delegate
                roomCaptureView.delegate = delegate

                // Add the RoomCaptureView to the Capacitor view
                guard let webView = self.bridge?.webView,
                    let superview = webView.superview
                else {
                    call.reject("Bridge or view not available")
                    return
                }

                // Get camera height (70% of screen)
                let screenHeight = UIScreen.main.bounds.height
                let cameraHeight = screenHeight * 0.85

                // Add room capture view below the webview
                superview.insertSubview(roomCaptureView, belowSubview: webView)
                roomCaptureView.translatesAutoresizingMaskIntoConstraints = false
                NSLayoutConstraint.activate([
                    roomCaptureView.topAnchor.constraint(equalTo: superview.topAnchor),
                    roomCaptureView.leadingAnchor.constraint(equalTo: superview.leadingAnchor),
                    roomCaptureView.trailingAnchor.constraint(equalTo: superview.trailingAnchor),
                    roomCaptureView.heightAnchor.constraint(equalToConstant: cameraHeight),
                ])

                // Start the capture session
                let configuration = RoomCaptureSession.Configuration()
                self.roomCaptureSession = roomCaptureView.captureSession
                self.roomCaptureSession?.run(configuration: configuration)

                // Notify webview that scanning has started
                self.notifyWebView(event: "roomCaptureStarted", data: [:])

                call.resolve()
            }
        } else {
            call.reject("RoomPlan requires iOS 17.0+")
        }
    }

    @objc func stopRoomCapture(_ call: CAPPluginCall) {
        PassthroughWebView.passthroughAllowed = false
        print("⚡️ stopRoomCapture called")
        if #available(iOS 17.0, *) {
            DispatchQueue.main.async { [weak self] in
                guard let self = self else {
                    call.reject("Plugin instance not available")
                    return
                }

                // Stop the capture session and process results
                self.roomCaptureSession?.stop()

                // Restore the webview opacity
                if let webView = self.bridge?.webView {
                    webView.isOpaque = true
                    webView.backgroundColor = UIColor.white
                    webView.scrollView.backgroundColor = UIColor.white
                    webView.scrollView.isOpaque = true

                    // Also restore the superview background if it exists
                    if let superView = webView.superview {
                        superView.backgroundColor = UIColor.white
                        superView.isOpaque = true

                        // Restore all parent views
                        var parentView = superView.superview
                        while parentView != nil {
                            parentView?.backgroundColor = UIColor.white
                            parentView?.isOpaque = true
                            parentView = parentView?.superview
                        }
                    }
                }

                // Clean up the RoomCaptureView
                self.roomCaptureView?.removeFromSuperview()
                self.roomCaptureView = nil
                self.roomCaptureSession = nil
                self.captureDelegate = nil

                // Notify webview that scanning has stopped
                self.notifyWebView(event: "roomCaptureStopped", data: [:])

                call.resolve()
            }
        } else {
            call.reject("RoomPlan requires iOS 17.0+")
        }
    }

    private func notifyWebView(event: String, data: [String: Any]) {
        if let webView = bridge?.webView {
            let jsonData = try? JSONSerialization.data(withJSONObject: data)
            let jsonString = jsonData.flatMap { String(data: $0, encoding: .utf8) } ?? "{}"
            let js = "window.dispatchEvent(new CustomEvent('\(event)', { detail: \(jsonString) }))"
            webView.evaluateJavaScript(js, completionHandler: nil)
        }
    }
}

// Room Capture Delegate to handle room data updates
@available(iOS 17.0, *)
class RoomCaptureDelegateImpl: NSObject, RoomCaptureViewDelegate, NSCoding {
    private var callback: (CapturedRoomData?, Error?) -> Void

    init(callback: @escaping (CapturedRoomData?, Error?) -> Void) {
        self.callback = callback
        super.init()
    }

    // NSCoding conformance
    required init?(coder: NSCoder) {
        callback = { _, _ in }
        super.init()
    }

    func encode(with coder: NSCoder) {
        // Nothing to encode
    }

    func captureView(shouldPresent roomDataForProcessing: CapturedRoomData, error: Error?) -> Bool {
        callback(roomDataForProcessing, error)
        return true  // Continue with processing
    }

    func captureView(didPresent processedResult: CapturedRoom, error: Error?) {
        // Nothing to do here, we're handling updates in real-time
    }
}
