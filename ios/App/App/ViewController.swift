//
//  ViewController.swift
//  App
//
//  Created by Christoph Probst on 24.05.25.
//

import Capacitor
import UIKit

class ViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Disable all WebView interactions

        // Do any additional setup after loading the view.
    }

    override open func webView(with frame: CGRect, configuration: WKWebViewConfiguration)
        -> WKWebView
    {
        CAPLog.print("⚡️  MY WEV VIEW YYYYYYYYYYYYYYYYYYYYYY...")

        return PassthroughWebView(frame: frame, configuration: configuration)
    }

    override open func capacitorDidLoad() {
        if #available(iOS 17.0, *) {
            bridge?.registerPluginInstance(RoomPlanPlugin())
        } else {
            // Fallback on earlier versions
        }
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

class PassthroughWebView: WKWebView {
    static var passthroughAllowed = false

    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        let hitView = super.hitTest(point, with: event)
        guard let hitView = hitView else { return nil }
        print(
            "⚡️ hitTest called", point,
            hitView.frame.maxX, hitView.frame.maxY,
            hitView.frame.minX, hitView.frame.minY,
            point.y < hitView.frame.maxY * 0.1,
            point.y > hitView.frame.maxY * 0.7
        )
        let noPassthrough = point.y < hitView.frame.maxY * 0.1 || point.y > hitView.frame.maxY * 0.8

        if PassthroughWebView.passthroughAllowed && !noPassthrough {
            return nil
        }
        return hitView
        // return super.hitTest(point, with: event)
    }
}
