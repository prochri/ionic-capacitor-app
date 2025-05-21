import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.ionicCapacitorApp",
  appName: "Ionic Capacitor App",
  webDir: "build",
  server: {
    androidScheme: "https",
    cleartext: true,
    // url: "http://10.150.1.50:3000",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      // Keep the default system status bar style for native look
      style: "default",
      // This is critical - don't overlay the web content
      overlaysWebView: false,
    },
  },
};

export default config;
