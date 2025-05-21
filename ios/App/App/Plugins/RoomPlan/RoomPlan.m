//
//  RoomPlan.m
//  App
//
//  Created by Suman Kumar on 13.05.25.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(RoomPlanPlugin, "RoomPlan",
    CAP_PLUGIN_METHOD(checkSupport, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(startRoomCapture, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(stopRoomCapture, CAPPluginReturnPromise);
)

// #import <Foundation/Foundation.h>
// #import <Capacitor/Capacitor.h>

// CAP_PLUGIN(RoomPlanPlugin, "RoomPlan",
//     CAP_PLUGIN_METHOD(checkSupport, CAPPluginReturnPromise);
//     CAP_PLUGIN_METHOD(presentRoomCapture, CAPPluginReturnPromise);
// )
