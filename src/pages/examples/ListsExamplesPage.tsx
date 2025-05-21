import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItemDivider,
  IonText,
} from "@ionic/react";
import {
  star,
  heart,
  mail,
  archive,
  trash,
  chevronForward,
} from "ionicons/icons";

const ListsExamplesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>List Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <IonText>
              <h2>List Components</h2>
              <p>Various list styles and layouts</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Basic List</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Mega Man X</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>The Legend of Zelda</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pac-Man</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Super Mario World</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>List with Icons</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon icon={star} slot="start" />
                <IonLabel>Favorites</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={heart} slot="start" />
                <IonLabel>Liked</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={mail} slot="start" />
                <IonLabel>Messages</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={archive} slot="start" />
                <IonLabel>Archived</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={trash} slot="start" />
                <IonLabel>Trash</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>List with Dividers</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItemDivider>
                <IonLabel>Fruits</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>Apple</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Banana</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Orange</IonLabel>
              </IonItem>

              <IonItemDivider>
                <IonLabel>Vegetables</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>Carrot</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Broccoli</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Spinach</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>List with Navigation</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem button detail>
                <IonLabel>View Profile</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>
              <IonItem button detail>
                <IonLabel>Account Settings</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>
              <IonItem button detail>
                <IonLabel>Privacy Policy</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>
              <IonItem button detail>
                <IonLabel>Terms of Service</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ListsExamplesPage;
