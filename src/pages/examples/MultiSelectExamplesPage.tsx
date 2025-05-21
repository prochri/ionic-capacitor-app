import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonText,
  IonIcon,
  IonItemDivider,
  IonChip,
  IonNote,
  IonToggle,
} from "@ionic/react";
import {
  checkmarkCircle,
  closeCircle,
  star,
  starOutline,
  checkmarkOutline,
} from "ionicons/icons";

const MultiSelectExamplesPage: React.FC = () => {
  // Checkbox states
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: true,
    option3: false,
    indeterminate: "indeterminate",
  });

  // Radio selection
  const [selectedRadio, setSelectedRadio] = useState("radio2");

  // Select multiple
  const [selectedFruits, setSelectedFruits] = useState<string[]>([
    "apple",
    "banana",
  ]);

  // Tags/Chips
  const [tags, setTags] = useState([
    { id: 1, name: "JavaScript", selected: true },
    { id: 2, name: "TypeScript", selected: true },
    { id: 3, name: "React", selected: false },
    { id: 4, name: "Angular", selected: false },
    { id: 5, name: "Vue", selected: false },
  ]);

  // Custom multi-select
  const [ratings, setRatings] = useState([
    { id: 1, name: "Quality", rating: 3 },
    { id: 2, name: "Price", rating: 4 },
    { id: 3, name: "Service", rating: 2 },
  ]);

  // Toggle switches
  const [toggles, setToggles] = useState({
    darkMode: false,
    notifications: true,
    autoUpdate: false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (option: string, checked: boolean) => {
    setCheckboxes({
      ...checkboxes,
      [option]: checked,
    });
  };

  // Handle chip selection
  const handleTagSelection = (id: number) => {
    setTags(
      tags.map((tag) =>
        tag.id === id ? { ...tag, selected: !tag.selected } : tag
      )
    );
  };

  // Handle star rating
  const handleRatingChange = (id: number, rating: number) => {
    setRatings(
      ratings.map((item) => (item.id === id ? { ...item, rating } : item))
    );
  };

  // Handle toggle change
  const handleToggleChange = (option: string, checked: boolean) => {
    setToggles({
      ...toggles,
      [option]: checked,
    });
  };

  // Create star rating component
  const StarRating = ({
    value,
    max = 5,
    onSelect,
  }: {
    value: number;
    max?: number;
    onSelect: (rating: number) => void;
  }) => {
    return (
      <div className="star-rating">
        {Array.from({ length: max }).map((_, i) => (
          <IonIcon
            key={i}
            icon={i < value ? star : starOutline}
            color={i < value ? "warning" : "medium"}
            onClick={() => onSelect(i + 1)}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        ))}
      </div>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Multi-Select Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <h2>Multi-Select Components</h2>
            <p>Various components for selecting multiple options</p>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Checkboxes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonCheckbox
                  checked={checkboxes.option1}
                  onIonChange={(e) =>
                    handleCheckboxChange("option1", e.detail.checked)
                  }
                  labelPlacement="end"
                >
                  Option 1
                </IonCheckbox>
              </IonItem>

              <IonItem>
                <IonCheckbox
                  checked={checkboxes.option2}
                  onIonChange={(e) =>
                    handleCheckboxChange("option2", e.detail.checked)
                  }
                  labelPlacement="end"
                >
                  Option 2
                </IonCheckbox>
              </IonItem>

              <IonItem>
                <IonCheckbox
                  checked={checkboxes.option3}
                  onIonChange={(e) =>
                    handleCheckboxChange("option3", e.detail.checked)
                  }
                  labelPlacement="end"
                >
                  Option 3
                </IonCheckbox>
              </IonItem>

              <IonItem>
                <IonCheckbox indeterminate labelPlacement="end">
                  Indeterminate State
                </IonCheckbox>
              </IonItem>

              <IonItem>
                <IonCheckbox disabled labelPlacement="end">
                  Disabled Checkbox
                </IonCheckbox>
              </IonItem>

              <IonItem lines="none">
                <IonText>
                  <p>
                    Selected options:{" "}
                    {Object.entries(checkboxes)
                      .filter(([key, value]) => value === true)
                      .map(([key]) => key)
                      .join(", ")}
                  </p>
                </IonText>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Radio Buttons</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRadioGroup
              value={selectedRadio}
              onIonChange={(e) => setSelectedRadio(e.detail.value)}
            >
              <IonItem>
                <IonRadio value="radio1" labelPlacement="end">
                  Option 1
                </IonRadio>
              </IonItem>

              <IonItem>
                <IonRadio value="radio2" labelPlacement="end">
                  Option 2
                </IonRadio>
              </IonItem>

              <IonItem>
                <IonRadio value="radio3" labelPlacement="end">
                  Option 3
                </IonRadio>
              </IonItem>

              <IonItem>
                <IonRadio value="radio4" labelPlacement="end" disabled>
                  Disabled Option
                </IonRadio>
              </IonItem>

              <IonItem lines="none">
                <IonText>
                  <p>Selected option: {selectedRadio}</p>
                </IonText>
              </IonItem>
            </IonRadioGroup>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Select Multiple</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonSelect
                multiple={true}
                value={selectedFruits}
                onIonChange={(e) => setSelectedFruits(e.detail.value)}
                placeholder="Select fruits"
                interfaceOptions={{
                  header: "Select Fruits",
                }}
              >
                <IonSelectOption value="apple">Apple</IonSelectOption>
                <IonSelectOption value="banana">Banana</IonSelectOption>
                <IonSelectOption value="orange">Orange</IonSelectOption>
                <IonSelectOption value="grape">Grape</IonSelectOption>
                <IonSelectOption value="kiwi">Kiwi</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem lines="none">
              <IonText>
                <p>Selected fruits: {selectedFruits.join(", ")}</p>
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Chips/Tags</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="ion-padding-bottom">
              {tags.map((tag) => (
                <IonChip
                  key={tag.id}
                  outline={!tag.selected}
                  color={tag.selected ? "primary" : "medium"}
                  onClick={() => handleTagSelection(tag.id)}
                >
                  {tag.selected && <IonIcon icon={checkmarkCircle} />}
                  <IonLabel>{tag.name}</IonLabel>
                </IonChip>
              ))}
            </div>

            <IonItem lines="none">
              <IonText>
                <p>
                  Selected tags:{" "}
                  {tags
                    .filter((tag) => tag.selected)
                    .map((tag) => tag.name)
                    .join(", ")}
                </p>
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Star Ratings</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {ratings.map((item) => (
                <IonItem key={item.id}>
                  <IonLabel>{item.name}</IonLabel>
                  <div slot="end">
                    <StarRating
                      value={item.rating}
                      onSelect={(rating) => handleRatingChange(item.id, rating)}
                    />
                  </div>
                </IonItem>
              ))}
            </IonList>

            <IonItem lines="none">
              <IonText>
                <p>
                  Average rating:{" "}
                  {(
                    ratings.reduce((acc, curr) => acc + curr.rating, 0) /
                    ratings.length
                  ).toFixed(1)}
                </p>
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Toggle Switches</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle
                  checked={toggles.darkMode}
                  onIonChange={(e) =>
                    handleToggleChange("darkMode", e.detail.checked)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel>Notifications</IonLabel>
                <IonToggle
                  checked={toggles.notifications}
                  onIonChange={(e) =>
                    handleToggleChange("notifications", e.detail.checked)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel>Auto-Update</IonLabel>
                <IonToggle
                  checked={toggles.autoUpdate}
                  onIonChange={(e) =>
                    handleToggleChange("autoUpdate", e.detail.checked)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel>Disabled Toggle</IonLabel>
                <IonToggle disabled />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MultiSelectExamplesPage;
