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
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonChip,
  IonBadge,
  IonToast,
} from "@ionic/react";
import {
  personCircleOutline,
  cameraOutline,
  saveOutline,
  mailOutline,
  callOutline,
  locationOutline,
  ribbonOutline,
  schoolOutline,
  languageOutline,
} from "ionicons/icons";

const ProfilePage: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("info");
  const [showToast, setShowToast] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St, Anytown, USA",
    bio: "Software developer passionate about mobile app development and UI design.",
    language: "english",
    skills: ["React", "TypeScript", "Ionic", "JavaScript"],
  });

  const handleChange = (field: string, value: any) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setShowToast(true);
    setActiveSegment("info");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center ion-padding">
          <IonAvatar
            style={{ width: "120px", height: "120px", margin: "0 auto" }}
          >
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Profile"
            />
          </IonAvatar>
          <IonButton fill="clear" size="small">
            <IonIcon slot="icon-only" icon={cameraOutline} />
          </IonButton>
          <h2>{`${profileData.firstName} ${profileData.lastName}`}</h2>
          <IonChip color="primary">
            <IonLabel>Developer</IonLabel>
          </IonChip>
        </div>

        <div className="ion-padding">
          <IonSegment
            value={activeSegment}
            onIonChange={(e) => setActiveSegment(e.detail.value as string)}
          >
            <IonSegmentButton value="info">
              <IonLabel>Info</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="edit">
              <IonLabel>Edit Profile</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="stats">
              <IonLabel>Stats</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {activeSegment === "info" && (
          <IonList>
            <IonItem>
              <IonIcon
                icon={personCircleOutline}
                slot="start"
                color="primary"
              />
              <IonLabel>
                <h2>Name</h2>
                <p>{`${profileData.firstName} ${profileData.lastName}`}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={mailOutline} slot="start" color="primary" />
              <IonLabel>
                <h2>Email</h2>
                <p>{profileData.email}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={callOutline} slot="start" color="primary" />
              <IonLabel>
                <h2>Phone</h2>
                <p>{profileData.phone}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={locationOutline} slot="start" color="primary" />
              <IonLabel>
                <h2>Address</h2>
                <p>{profileData.address}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={languageOutline} slot="start" color="primary" />
              <IonLabel>
                <h2>Language</h2>
                <p style={{ textTransform: "capitalize" }}>
                  {profileData.language}
                </p>
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>
                <h2>Bio</h2>
                <p>{profileData.bio}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={ribbonOutline} slot="start" color="primary" />
              <IonLabel>
                <h2>Skills</h2>
                <div className="ion-padding-top">
                  {profileData.skills.map((skill, index) => (
                    <IonChip key={index} outline>
                      <IonLabel>{skill}</IonLabel>
                    </IonChip>
                  ))}
                </div>
              </IonLabel>
            </IonItem>
          </IonList>
        )}

        {activeSegment === "edit" && (
          <IonList>
            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput
                value={profileData.firstName}
                onIonChange={(e) => handleChange("firstName", e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput
                value={profileData.lastName}
                onIonChange={(e) => handleChange("lastName", e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={profileData.email}
                onIonChange={(e) => handleChange("email", e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Phone</IonLabel>
              <IonInput
                type="tel"
                value={profileData.phone}
                onIonChange={(e) => handleChange("phone", e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput
                value={profileData.address}
                onIonChange={(e) => handleChange("address", e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Bio</IonLabel>
              <IonTextarea
                value={profileData.bio}
                rows={4}
                onIonChange={(e) => handleChange("bio", e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Language</IonLabel>
              <IonSelect
                value={profileData.language}
                onIonChange={(e) => handleChange("language", e.detail.value)}
              >
                <IonSelectOption value="english">English</IonSelectOption>
                <IonSelectOption value="spanish">Spanish</IonSelectOption>
                <IonSelectOption value="french">French</IonSelectOption>
                <IonSelectOption value="german">German</IonSelectOption>
                <IonSelectOption value="chinese">Chinese</IonSelectOption>
              </IonSelect>
            </IonItem>

            <div className="ion-padding">
              <IonButton expand="block" onClick={handleSave}>
                <IonIcon slot="start" icon={saveOutline} />
                Save Profile
              </IonButton>
            </div>
          </IonList>
        )}

        {activeSegment === "stats" && (
          <div>
            <IonCard>
              <IonCardContent>
                <h2>Activity Stats</h2>
                <div className="ion-padding-vertical">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="ion-text-center">
                      <h3>Projects</h3>
                      <IonBadge color="primary">12</IonBadge>
                    </div>
                    <div className="ion-text-center">
                      <h3>Tasks</h3>
                      <IonBadge color="secondary">48</IonBadge>
                    </div>
                    <div className="ion-text-center">
                      <h3>Teams</h3>
                      <IonBadge color="tertiary">5</IonBadge>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonList>
              <IonItem>
                <IonIcon icon={schoolOutline} slot="start" color="primary" />
                <IonLabel>
                  <h2>Experience</h2>
                  <p>5+ years in mobile development</p>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon icon={ribbonOutline} slot="start" color="primary" />
                <IonLabel>
                  <h2>Achievements</h2>
                  <p>10 successful app launches</p>
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <h2>Recent Activity</h2>
                  <IonNote>Last active: Today at 2:30 PM</IonNote>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Profile updated successfully!"
          duration={2000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
