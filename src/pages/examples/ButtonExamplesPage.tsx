import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonFab,
  IonFabButton,
  IonBadge,
} from "@ionic/react";
import {
  heart,
  add,
  trash,
  star,
  share,
  cloud,
  construct,
  camera,
  send,
  heartOutline,
  downloadOutline,
} from "ionicons/icons";

const ButtonExamplesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Button Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <IonText>
              <h2>Button Components</h2>
              <p>Various button styles, sizes, and states</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Button Types</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton>Default</IonButton>
            <IonButton fill="outline">Outline</IonButton>
            <IonButton fill="clear">Clear</IonButton>
            <IonButton fill="solid">Solid</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Button Sizes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton size="small">Small</IonButton>
            <IonButton size="default">Default</IonButton>
            <IonButton size="large">Large</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Button Colors</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton color="primary">Primary</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color="secondary">Secondary</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton color="tertiary">Tertiary</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color="success">Success</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton color="warning">Warning</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color="danger">Danger</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton color="light">Light</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color="medium">Medium</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton color="dark">Dark</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Buttons with Icons</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton>
              <IonIcon slot="start" icon={star}></IonIcon>
              With Icon
            </IonButton>

            <IonButton>
              With Icon
              <IonIcon slot="end" icon={send}></IonIcon>
            </IonButton>

            <IonButton>
              <IonIcon slot="icon-only" icon={star}></IonIcon>
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Button States</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton disabled>Disabled</IonButton>

            <IonButton onClick={simulateLoading} disabled={loading}>
              {loading ? "Loading..." : "Click to Load"}
              {loading && <span className="button-inner-loading"></span>}
            </IonButton>

            <IonButton fill="outline" onClick={() => setFavorite(!favorite)}>
              <IonIcon
                slot="start"
                icon={favorite ? heart : heartOutline}
              ></IonIcon>
              {favorite ? "Favorited" : "Favorite"}
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Block & Full Buttons</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block">Block Button</IonButton>
            <IonButton expand="full" className="ion-margin-top">
              Full Width
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Button Groups</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButtons>
              <IonButton>Button 1</IonButton>
              <IonButton>Button 2</IonButton>
              <IonButton>Button 3</IonButton>
            </IonButtons>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>FAB Buttons</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div
              style={{
                height: "100px",
                position: "relative",
                background: "#f4f5f8",
                borderRadius: "8px",
              }}
            >
              <IonFab vertical="center" horizontal="center">
                <IonFabButton>
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Buttons with Badges</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton>
              <IonBadge color="danger" slot="end">
                8
              </IonBadge>
              Messages
            </IonButton>

            <IonButton>
              Downloads
              <IonIcon slot="end" icon={downloadOutline}></IonIcon>
              <IonBadge color="success" slot="end">
                12
              </IonBadge>
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* FAB button in the bottom right corner */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ButtonExamplesPage;
