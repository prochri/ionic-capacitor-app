import React, { useState } from "react";
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
  IonInput,
  IonNote,
  IonItemDivider,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonTextarea,
  IonText,
} from "@ionic/react";
import {
  informationCircleOutline,
  checkmarkCircle,
  closeCircle,
  alertCircleOutline,
} from "ionicons/icons";

const InputExamplesPage: React.FC = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState<number>();
  const [tel, setTel] = useState("");
  const [searchText, setSearchText] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [touched, setTouched] = useState(false);

  // Email validation
  const validateEmail = (email: string) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  };

  const isValid = validateEmail(email);
  const isInvalid = touched && email !== "" && !isValid;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Input Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <IonText>
              <h2>Input Components</h2>
              <p>Various form input controls for collecting user data</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonList lines="full">
          <IonItemDivider>
            <IonLabel>BASIC INPUTS</IonLabel>
          </IonItemDivider>

          {/* Basic Input */}
          <IonItem>
            <IonLabel position="floating">Standard Input</IonLabel>
            <IonInput
              value={text}
              placeholder="Enter text"
              onIonChange={(e) => setText(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>

          {/* Label Positions */}
          <IonItem>
            <IonLabel position="stacked">Stacked Label</IonLabel>
            <IonInput placeholder="Enter text"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Fixed Label</IonLabel>
            <IonInput placeholder="Enter text"></IonInput>
          </IonItem>

          <IonItemDivider>
            <IonLabel>INPUT TYPES</IonLabel>
          </IonItemDivider>

          {/* Email Input with Validation */}
          <IonItem
            className={`${isInvalid ? "ion-invalid" : ""} ${
              isValid && touched ? "ion-valid" : ""
            }`}
          >
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              onIonBlur={() => setTouched(true)}
              placeholder="email@domain.com"
            ></IonInput>
            <IonNote slot="helper">Enter a valid email</IonNote>
            <IonNote slot="error">Invalid email format</IonNote>
            {isValid && touched && (
              <IonIcon icon={checkmarkCircle} color="success" slot="end" />
            )}
            {isInvalid && (
              <IonIcon icon={closeCircle} color="danger" slot="end" />
            )}
          </IonItem>

          {/* Password Input */}
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              placeholder="Enter password"
            ></IonInput>
          </IonItem>

          {/* Number Input */}
          <IonItem>
            <IonLabel position="floating">Number</IonLabel>
            <IonInput
              type="number"
              value={number}
              onIonChange={(e) => setNumber(parseFloat(e.detail.value!))}
              placeholder="Enter a number"
            ></IonInput>
          </IonItem>

          {/* Tel Input */}
          <IonItem>
            <IonLabel position="floating">Telephone</IonLabel>
            <IonInput
              type="tel"
              value={tel}
              onIonChange={(e) => setTel(e.detail.value!)}
              placeholder="(555) 555-5555"
            ></IonInput>
          </IonItem>

          <IonItemDivider>
            <IonLabel>SEARCH & TEXTAREA</IonLabel>
          </IonItemDivider>

          {/* Search Input */}
          <IonItem lines="none">
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              placeholder="Search items..."
              animated
              showCancelButton="focus"
            ></IonSearchbar>
          </IonItem>

          {/* Textarea */}
          <IonItem>
            <IonLabel position="floating">Comments</IonLabel>
            <IonTextarea
              value={textareaValue}
              onIonChange={(e) => setTextareaValue(e.detail.value!)}
              placeholder="Enter multiple lines of text"
              rows={4}
              autoGrow
            ></IonTextarea>
          </IonItem>

          <IonItemDivider>
            <IonLabel>DISABLED & READONLY</IonLabel>
          </IonItemDivider>

          {/* Disabled Input */}
          <IonItem>
            <IonLabel position="floating">Disabled Input</IonLabel>
            <IonInput value="This input is disabled" disabled></IonInput>
          </IonItem>

          {/* Readonly Input */}
          <IonItem>
            <IonLabel position="floating">Readonly Input</IonLabel>
            <IonInput value="This input is readonly" readonly></IonInput>
            <IonNote slot="helper">
              <IonIcon icon={informationCircleOutline} color="medium" /> This
              value cannot be changed
            </IonNote>
          </IonItem>

          <IonItemDivider>
            <IonLabel>INPUT WITH ICONS</IonLabel>
          </IonItemDivider>

          {/* Input with icons */}
          <IonItem>
            <IonIcon icon={alertCircleOutline} slot="start" color="primary" />
            <IonLabel position="floating">Input with Icon</IonLabel>
            <IonInput placeholder="Enter text"></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InputExamplesPage;
