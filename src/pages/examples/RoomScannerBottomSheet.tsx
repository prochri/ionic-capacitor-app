import { IonButton, IonContent, IonModal, IonToast } from "@ionic/react"

export const RoomScannerBottomSheet: React.FC<{ handleFinishScan: () => void, handleCancel: () => void }> = ({ handleFinishScan, handleCancel }) => {
  return <IonContent fullscreen className="transparent-content">
    {/* Bottom sheet controls */}
    <IonModal
      isOpen={true}
      initialBreakpoint={0.2}
      breakpoints={[0.2]}
      backdropBreakpoint={0.2}
      handle={true}
      className="ios-bottom-sheet"
      canDismiss={false}
    >
      <div className="bottom-sheet-fixed">
        <div className="bottom-sheet-handle"></div>
        <div
          className="ion-padding-horizontal ion-padding-top ion-text-center"
          style={{ paddingBottom: "10px" }}
        >
          <IonButton
            expand="block"
            color="success"
            className="start-scan-button"
            onClick={handleFinishScan}
          >
            Start story scan
          </IonButton>

          <IonButton
            fill="clear"
            color="danger"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </IonButton>
        </div>
      </div>
    </IonModal>

  </IonContent>
}
