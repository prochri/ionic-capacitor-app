import React, { useEffect } from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
  setupIonicReact,
  isPlatform,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

import {
  homeOutline,
  homeSharp,
  personOutline,
  personSharp,
  settingsOutline,
  settingsSharp,
} from "ionicons/icons";

/* Pages */
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

/* Component Examples */
import InputExamplesPage from "./pages/examples/InputExamplesPage";
import ButtonExamplesPage from "./pages/examples/ButtonExamplesPage";
import MapExamplesPage from "./pages/examples/MapExamplesPage";
import MultiSelectExamplesPage from "./pages/examples/MultiSelectExamplesPage";
import SearchExamplesPage from "./pages/examples/SearchExamplesPage";
import ListsExamplesPage from "./pages/examples/ListsExamplesPage";
import BottomSheetExamplesPage from "./pages/examples/BottomSheetExamplesPage";
import TaskDetailsPage from "./pages/examples/TaskDetailsPage";
import CameraExamplesPage from "./pages/examples/CameraExamplesPage";
import RoomScannerPage from "./pages/examples/RoomScannerPage";

// Set up Ionic with animations
setupIonicReact({
  // Enable swipe to go back gesture
  swipeBackEnabled: true,
  // Use iOS animations across all platforms for smoother transitions
  animated: true,
});

const App: React.FC = () => {
  // Status bar and navigation bar setup
  useEffect(() => {
    const setupApp = async () => {
      if (Capacitor.isNativePlatform() && isPlatform("android")) {
        try {
          // Use default style and don't overlay webview
          await StatusBar.setStyle({ style: Style.Default });
          await StatusBar.setOverlaysWebView({ overlay: false });

          // Determine status bar height (approximately)
          const statusBarHeight = "24px";

          // Add CSS to fix navigation bar padding
          const style = document.createElement("style");
          style.textContent = `
            /* Add padding to the top of toolbars */
            ion-toolbar {
              --padding-top: ${statusBarHeight};
              --min-height: calc(56px + ${statusBarHeight});
            }
            
            /* Fix toolbar title positioning */
            ion-title {
              padding-top: ${statusBarHeight};
              height: calc(56px + ${statusBarHeight});
              display: flex;
              align-items: center;
            }
            
            /* Fix back button positioning */
            ion-back-button {
              margin-top: ${statusBarHeight};
            }
            
            /* Adjust header height */
            ion-header {
              height: auto !important;
            }
            
            /* Ensure content starts below the header */
            ion-content {
              --padding-top: 0px;
            }
          `;
          document.head.appendChild(style);

          return () => {
            // Clean up
            document.head.removeChild(style);
          };
        } catch (error) {
          console.error("Error setting up status bar:", error);
        }
      }
    };

    setupApp();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet animated={true}>
            {/* Main Tabs */}
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/settings">
              <SettingsPage />
            </Route>

            {/* Component Example Pages */}
            <Route exact path="/examples/inputs">
              <InputExamplesPage />
            </Route>
            <Route exact path="/examples/buttons">
              <ButtonExamplesPage />
            </Route>
            <Route exact path="/examples/maps">
              <MapExamplesPage />
            </Route>
            <Route exact path="/examples/multiselect">
              <MultiSelectExamplesPage />
            </Route>
            <Route exact path="/examples/search">
              <SearchExamplesPage />
            </Route>
            <Route exact path="/examples/lists">
              <ListsExamplesPage />
            </Route>
            <Route exact path="/examples/bottomsheet">
              <BottomSheetExamplesPage />
            </Route>
            <Route exact path="/examples/bottomsheet/task/:id">
              <TaskDetailsPage />
            </Route>
            <Route exact path="/examples/camera">
              <CameraExamplesPage />
            </Route>
            <Route exact path="/examples/roomscanner">
              <RoomScannerPage />
            </Route>

            {/* Default Route */}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon ios={homeOutline} md={homeSharp} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon ios={personOutline} md={personSharp} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon ios={settingsOutline} md={settingsSharp} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
