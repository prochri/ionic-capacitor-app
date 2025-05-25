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


## Run the project with live reload

   ```bash
npx cap run ios --live-reload
```
