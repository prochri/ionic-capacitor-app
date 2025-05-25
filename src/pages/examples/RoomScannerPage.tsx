import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonToast,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { registerPlugin } from "@capacitor/core";
import { close, arrowBack } from "ionicons/icons";
import { RoomScannerBottomSheet } from "./RoomScannerBottomSheet";

// Define RoomPlan plugin interface with the methods we need
interface RoomPlanPlugin {
  startRoomCapture(): Promise<void>;
  stopRoomCapture(): Promise<void>;
}

// Register the RoomPlan plugin
const RoomPlan = registerPlugin<RoomPlanPlugin>("RoomPlan");

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

const RoomScannerScreen: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [roomData, setRoomData] = useState<CapturedRoomData | null>(null);
  const history = useHistory();

  useEffect(() => {
    // Start room capture when the component mounts
    startRoomCapture();

    // Set up event listeners for RoomPlan events
    window.addEventListener("roomCaptureStarted", handleRoomCaptureStarted);
    window.addEventListener("roomCaptureStopped", handleRoomCaptureStopped);
    window.addEventListener("roomCaptureUpdate", handleRoomCaptureUpdate);
    window.addEventListener("roomCaptureError", handleRoomCaptureError);

    // Clean up event listeners and stop capture when component unmounts
    return () => {
      console.log("unmounting");
      // stopRoomCapture();
      window.removeEventListener(
        "roomCaptureStarted",
        handleRoomCaptureStarted
      );
      window.removeEventListener(
        "roomCaptureStopped",
        handleRoomCaptureStopped
      );
      window.removeEventListener("roomCaptureUpdate", handleRoomCaptureUpdate);
      window.removeEventListener("roomCaptureError", handleRoomCaptureError);
    };
  }, []);

  const handleRoomCaptureStarted = () => {
    console.log("Room capture started");
    makeViewTransparent();
  };

  const handleRoomCaptureStopped = () => {
    console.log("Room capture stopped");
    restoreViewOpacity();

    // Navigate back to home screen with room data
    if (roomData) {
      history.replace({
        pathname: "/",
        state: { roomData },
      });
    } else {
      history.replace("/");
    }
  };

  const handleRoomCaptureUpdate = (event: Event) => {
    const customEvent = event as CustomEvent;
    if (customEvent.detail && customEvent.detail.room) {
      try {
        const room = JSON.parse(customEvent.detail.room) as CapturedRoomData;
        setRoomData(room);
      } catch (error) {
        console.error("Error parsing room data:", error);
      }
    }
  };

  const handleRoomCaptureError = (event: Event) => {
    const customEvent = event as CustomEvent;
    if (customEvent.detail && customEvent.detail.error) {
      setError(customEvent.detail.error);
      setShowError(true);
    }
  };

  const makeViewTransparent = () => {
    // Make body and all containers transparent to show the camera view
    document.body.classList.add("camera-active");

    // Make app container transparent
    const appRoot = document.querySelector("ion-app");
    if (appRoot) {
      appRoot.style.background = "transparent";
      appRoot.style.backgroundColor = "transparent";
    }

    // Make content containers transparent
    document.querySelectorAll("ion-content").forEach((el) => {
      el.style.setProperty("--background", "transparent", "important");
      el.style.background = "transparent";
      el.style.backgroundColor = "transparent";
    });

    // Make page transparent
    document.querySelectorAll(".ion-page").forEach((el) => {
      (el as HTMLElement).style.background = "transparent";
      (el as HTMLElement).style.backgroundColor = "transparent";
    });
  };

  const restoreViewOpacity = () => {
    // Restore normal backgrounds
    document.body.classList.remove("camera-active");

    // Restore app container
    const appRoot = document.querySelector("ion-app");
    if (appRoot) {
      appRoot.style.background = "";
      appRoot.style.backgroundColor = "";
    }

    // Restore content containers
    document.querySelectorAll("ion-content").forEach((el) => {
      el.style.removeProperty("--background");
      el.style.background = "";
      el.style.backgroundColor = "";
    });

    // Restore page
    document.querySelectorAll(".ion-page").forEach((el) => {
      (el as HTMLElement).style.background = "";
      (el as HTMLElement).style.backgroundColor = "";
    });
  };

  const startRoomCapture = async () => {
    try {
      await RoomPlan.startRoomCapture();
    } catch (error) {
      console.error("Error starting room capture:", error);
      setError(`Failed to start room capture: ${error}`);
      setShowError(true);
      history.replace("/");
    }
  };

  const stopRoomCapture = async () => {
    try {
      await RoomPlan.stopRoomCapture();
    } catch (error) {
      console.error("Error stopping room capture:", error);
    }
  };

  const handleFinishScan = () => {
    // Explicitly stop capture before navigating
    stopRoomCapture();
  };

  const handleCancel = () => {
    // Clear room data and stop capture
    setRoomData(null);
    stopRoomCapture();
    // Make sure we use replace to avoid the back button bringing us back to the scanner
    history.replace("/");
  };

  return (
    <IonPage className="scanner-page">
      <IonHeader className="transparent-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleCancel}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Room Scanner uwu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <RoomScannerBottomSheet
        handleFinishScan={handleFinishScan}
        handleCancel={handleCancel}
      />
    </IonPage>
  );
};

export default RoomScannerScreen;
