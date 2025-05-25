import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonSpinner,
  IonToast,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { Capacitor } from "@capacitor/core";
import { registerPlugin } from "@capacitor/core";
import { camera } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

// Define RoomPlan plugin interface
interface RoomPlanPlugin {
  checkSupport(): Promise<{ supported: boolean }>;
}

// CapturedRoom interface
interface CapturedRoomData {
  identifier: string;
  story: number;
  dateCreated: string;
  confidence: string;
  sections: any[];
  floors: any[];
  walls: any[];
  doors: any[];
  windows: any[];
  openings: any[];
  objects: any[];
}

interface LocationState {
  roomData?: CapturedRoomData;
}

// Register the RoomPlan plugin
const RoomPlan = registerPlugin<RoomPlanPlugin>("RoomPlan");

const CameraExamplesPage: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [showError, setShowError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSupported, setIsSupported] = React.useState(false);
  const [roomData, setRoomData] = React.useState<CapturedRoomData | null>(null);

  const history = useHistory();
  const location = useLocation<LocationState>();

  useEffect(() => {
    // Always reset loading state when component mounts or is navigated to
    setIsLoading(false);

    // Check if RoomPlan is supported when component mounts
    const checkRoomPlanSupport = async () => {
      try {
        const { supported } = await RoomPlan.checkSupport();
        setIsSupported(supported);
        if (!supported) {
          setError(
            "RoomPlan is not supported on this device. iOS 17+ with LiDAR is required."
          );
          setShowError(true);
        }
      } catch (error) {
        console.error("Error checking RoomPlan support:", error);
        setError(`Failed to check RoomPlan support: ${error}`);
        setShowError(true);
      }
    };

    checkRoomPlanSupport();
  }, []);

  useEffect(() => {
    // Check if returning from scanner screen with room data
    if (location.state?.roomData) {
      setRoomData(location.state.roomData);
      // Clear the location state to avoid re-displaying on refresh
      history.replace({ ...location, state: {} });
    }
  }, [location, history]);

  const handleStartRoomScan = async () => {
    try {
      setIsLoading(true);

      if (!isSupported) {
        setError(
          "RoomPlan is not supported on this device. iOS 17+ with LiDAR is required."
        );
        setShowError(true);
        setIsLoading(false);
        return;
      }

      // Navigate to the room scanner screen
      history.push("/examples/roomscanner");
    } catch (error) {
      console.error("Error starting room scan:", error);
      setError(`Failed to start room scan: ${error}`);
      setShowError(true);
      setIsLoading(false);
    }
  };

  const handleClearRoomData = () => {
    setRoomData(null);
  };

  // Helper function to format room data
  const formatRoomData = (room: CapturedRoomData) => {
    return `
Room ID: ${room.identifier || "N/A"}
Story: ${room.story || "N/A"}
Created: ${room.dateCreated ? new Date(room.dateCreated).toLocaleString() : "N/A"
      }
Confidence: ${room.confidence || "N/A"}
Walls: ${room.walls?.length || 0}
Doors: ${room.doors?.length || 0}
Windows: ${room.windows?.length || 0}
Objects: ${room.objects?.length || 0}
    `.trim();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Room Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding">
          <h1>3D Room Scanner</h1>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Room Plan Scanner</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>
                  Use your device's LiDAR scanner to capture room data in 3D.
                </p>
                <p>
                  This feature requires an iOS device with LiDAR sensor (iPhone
                  12 Pro or newer, iPad Pro).
                </p>
              </IonText>

              <IonButton
                expand="block"
                onClick={handleStartRoomScan}
                disabled={isLoading || !isSupported}
                className="ion-margin-top"
              >
                {isLoading ? (
                  <>
                    <IonSpinner name="crescent" />
                    <span style={{ marginLeft: "10px" }}>Loading...</span>
                  </>
                ) : (
                  <>
                    <IonIcon icon={camera} slot="start" />
                    Start Room Scan
                  </>
                )}
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Display room data if available */}
          {roomData && (
            <IonCard className="ion-margin-top">
              <IonCardHeader>
                <IonCardTitle>Captured Room Data</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <pre
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {formatRoomData(roomData)}
                </pre>

                {/* Show raw JSON in a collapsible section */}
                <details style={{ marginTop: "10px" }}>
                  <summary>View Raw JSON</summary>
                  <pre
                    style={{
                      backgroundColor: "#f4f4f4",
                      padding: "10px",
                      borderRadius: "8px",
                      fontSize: "10px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    {JSON.stringify(roomData, null, 2)}
                  </pre>
                </details>

                <IonButton
                  expand="block"
                  color="medium"
                  onClick={handleClearRoomData}
                  className="ion-margin-top"
                >
                  Clear Room Data
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message={error || ""}
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default CameraExamplesPage;
