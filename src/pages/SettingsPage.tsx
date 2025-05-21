import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  IonButton,
  IonItemDivider,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonNote,
  IonAlert,
  IonText,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import {
  moonOutline,
  notificationsOutline,
  lockClosedOutline,
  languageOutline,
  volumeHighOutline,
  refreshOutline,
  logOutOutline,
  helpCircleOutline,
  cloudUploadOutline,
  personOutline,
  settingsOutline,
  colorPaletteOutline,
  heartOutline,
  alertCircleOutline,
} from "ionicons/icons";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "english",
    volume: 75,
    autoSave: true,
    themeColor: "blue",
    fontSize: "medium",
    privacy: {
      locationSharing: true,
      analytics: true,
      dataSaving: false,
    },
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleToggleChange = (key: string, checked: boolean) => {
    setSettings({
      ...settings,
      [key]: checked,
    });
  };

  const handlePrivacyToggle = (key: string, checked: boolean) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: checked,
      },
    });
  };

  const handleRangeChange = (value: number) => {
    setSettings({
      ...settings,
      volume: value,
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const showConfirmation = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <IonText>
              <h2>App Settings</h2>
              <p>Customize your app experience</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonItemDivider>
            <IonLabel>APPEARANCE</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              checked={settings.darkMode}
              onIonChange={(e) =>
                handleToggleChange("darkMode", e.detail.checked)
              }
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={colorPaletteOutline} slot="start" />
            <IonLabel>Theme Color</IonLabel>
            <IonSelect
              value={settings.themeColor}
              onIonChange={(e) =>
                handleSelectChange("themeColor", e.detail.value)
              }
              interface="popover"
            >
              <IonSelectOption value="blue">Blue</IonSelectOption>
              <IonSelectOption value="green">Green</IonSelectOption>
              <IonSelectOption value="purple">Purple</IonSelectOption>
              <IonSelectOption value="orange">Orange</IonSelectOption>
              <IonSelectOption value="red">Red</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Font Size</IonLabel>
            <IonSelect
              value={settings.fontSize}
              onIonChange={(e) =>
                handleSelectChange("fontSize", e.detail.value)
              }
              interface="popover"
            >
              <IonSelectOption value="small">Small</IonSelectOption>
              <IonSelectOption value="medium">Medium</IonSelectOption>
              <IonSelectOption value="large">Large</IonSelectOption>
              <IonSelectOption value="x-large">Extra Large</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItemDivider>
            <IonLabel>NOTIFICATIONS</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Push Notifications</IonLabel>
            <IonToggle
              checked={settings.notifications}
              onIonChange={(e) =>
                handleToggleChange("notifications", e.detail.checked)
              }
            />
          </IonItem>

          <IonItemDivider>
            <IonLabel>AUDIO</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={volumeHighOutline} slot="start" />
            <IonLabel>Volume</IonLabel>
            <IonNote slot="end">{settings.volume}%</IonNote>
          </IonItem>

          <IonItem>
            <IonRange
              min={0}
              max={100}
              step={5}
              value={settings.volume}
              onIonChange={(e) => handleRangeChange(e.detail.value as number)}
            />
          </IonItem>

          <IonItemDivider>
            <IonLabel>LANGUAGE</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={languageOutline} slot="start" />
            <IonLabel>App Language</IonLabel>
            <IonSelect
              value={settings.language}
              onIonChange={(e) =>
                handleSelectChange("language", e.detail.value)
              }
            >
              <IonSelectOption value="english">English</IonSelectOption>
              <IonSelectOption value="spanish">Spanish</IonSelectOption>
              <IonSelectOption value="french">French</IonSelectOption>
              <IonSelectOption value="german">German</IonSelectOption>
              <IonSelectOption value="chinese">Chinese</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItemDivider>
            <IonLabel>PRIVACY</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Location Sharing</IonLabel>
            <IonToggle
              checked={settings.privacy.locationSharing}
              onIonChange={(e) =>
                handlePrivacyToggle("locationSharing", e.detail.checked)
              }
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Analytics</IonLabel>
            <IonToggle
              checked={settings.privacy.analytics}
              onIonChange={(e) =>
                handlePrivacyToggle("analytics", e.detail.checked)
              }
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Data Saving Mode</IonLabel>
            <IonToggle
              checked={settings.privacy.dataSaving}
              onIonChange={(e) =>
                handlePrivacyToggle("dataSaving", e.detail.checked)
              }
            />
          </IonItem>

          <IonItemDivider>
            <IonLabel>ACCOUNT</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={cloudUploadOutline} slot="start" />
            <IonLabel>Auto-Save Data</IonLabel>
            <IonToggle
              checked={settings.autoSave}
              onIonChange={(e) =>
                handleToggleChange("autoSave", e.detail.checked)
              }
            />
          </IonItem>

          <IonItem
            button
            onClick={() =>
              showConfirmation("Are you sure you want to reset all settings?")
            }
          >
            <IonIcon icon={refreshOutline} slot="start" />
            <IonLabel>Reset Settings</IonLabel>
          </IonItem>

          <IonItem
            button
            onClick={() =>
              showConfirmation("Are you sure you want to log out?")
            }
          >
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Logout</IonLabel>
          </IonItem>

          <IonItemDivider>
            <IonLabel>HELP</IonLabel>
          </IonItemDivider>

          <IonItem button>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Help Center</IonLabel>
          </IonItem>

          <IonItem button>
            <IonIcon icon={heartOutline} slot="start" />
            <IonLabel>Feedback</IonLabel>
          </IonItem>

          <IonItem button>
            <IonIcon icon={alertCircleOutline} slot="start" />
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonList>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirm Action"
          message={alertMessage}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Confirm",
              role: "confirm",
              handler: () => {
                console.log("Action confirmed");
                // Handle the confirmation action here
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
