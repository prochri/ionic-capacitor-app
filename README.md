# Ionic Capacitor Project with LiDAR scanning example

This repository contains an Ionic application with Capacitor integration that utilizes Apple's LiDAR API through a custom plugin.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Xcode (latest version)
- CocoaPods
- iOS device with LiDAR sensor (iPhone 12 Pro/Pro Max or newer, iPad Pro 2020 or newer)
- Ionic CLI (`npm install -g @ionic/cli`)
- Capacitor CLI (`npm install -g @capacitor/cli`)

## Installation

1. Clone this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Sync your web code to the native project:
   ```bash
   npx cap sync
   ```

## Configure RoomPlanPlugin

1. Open the Capacitor configuration file:
   ```bash
   open ios/App/App/capacitor.config.json
   ```

2. Add "RoomPlanPlugin" to the plugins list "packageClassList"
   ```json
   "packageClassList": [
      "CameraPreview",
      "AppPlugin",
      "CAPCameraPlugin",
      "GeolocationPlugin",
      "HapticsPlugin",
      "KeyboardPlugin",
      "StatusBarPlugin",
      "RoomPlanPlugin"
   ]
   ```

## Run the project in Xcode

1. Open the iOS project in Xcode:
   ```bash
   npx cap open ios
   ```

2. In Xcode, select your development team in the "Signing & Capabilities" tab.

3. Connect your iOS device (must have LiDAR sensor).

4. Select your device from the device dropdown menu in Xcode.

5. Click the "Run" button in Xcode or press Cmd+R to build and run the application on your device.
