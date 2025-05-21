import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonRippleEffect,
  createAnimation,
  IonItemDivider,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  chevronForward,
  createOutline,
  mapOutline,
  radioButtonOnOutline,
  checkboxOutline,
  searchOutline,
  listOutline,
  chevronUpOutline,
  cameraOutline,
} from "ionicons/icons";

const HomePage: React.FC = () => {
  const history = useHistory();

  // Components to display on the home page
  const components = [
    {
      name: "Inputs",
      icon: createOutline,
      route: "/examples/inputs",
      description: "Text fields, search bars, and more",
    },
    {
      name: "Buttons",
      icon: radioButtonOnOutline,
      route: "/examples/buttons",
      description: "Various button styles and states",
    },
    {
      name: "Map",
      icon: mapOutline,
      route: "/examples/maps",
      description: "Interactive maps with markers",
    },
    {
      name: "Multi-Select",
      icon: checkboxOutline,
      route: "/examples/multiselect",
      description: "Multiple selection components",
    },
    {
      name: "Search",
      icon: searchOutline,
      route: "/examples/search",
      description: "Search interfaces and filtering",
    },
    {
      name: "Lists",
      icon: listOutline,
      route: "/examples/lists",
      description: "Various list layouts and styles",
    },
    {
      name: "Bottom Sheet",
      icon: chevronUpOutline,
      route: "/examples/bottomsheet",
      description: "Modal sheets from bottom of screen",
    },
    {
      name: "Camera",
      icon: cameraOutline,
      route: "/examples/camera",
      description: "Scanning with camera",
    },
  ];

  const handleItemClick = (route: string, itemId: string) => {
    // Animate the item before navigation
    const item = document.getElementById(itemId);
    if (item) {
      const animation = createAnimation()
        .addElement(item)
        .duration(100)
        .easing("ease-out")
        .fromTo("transform", "scale(1)", "scale(0.98)")
        .fromTo("opacity", "1", "0.9")
        .afterStyles({
          transform: "scale(1)",
          opacity: "1",
        });

      animation.play().then(() => {
        // Navigate to component example page after animation completes
        history.push(route);
      });
    } else {
      // Fallback if animation fails
      history.push(route);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Component Playground</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <h1 className="ion-padding-start">UI Components</h1>
          <p className="ion-padding-start ion-padding-bottom">
            Explore various UI components and their implementations
          </p>
        </div>

        <IonList>
          <IonItemDivider>
            <IonLabel>FORM COMPONENTS</IonLabel>
          </IonItemDivider>

          {components.slice(0, 4).map((component, index) => (
            <IonItem
              key={index}
              id={`component-${index}`}
              detail={false}
              className="ion-activatable"
              onClick={() =>
                handleItemClick(component.route, `component-${index}`)
              }
              lines="full"
              button
            >
              <IonIcon
                icon={component.icon}
                slot="start"
                className="component-icon"
              />
              <IonLabel>
                <h2>{component.name}</h2>
                <p>{component.description}</p>
              </IonLabel>
              <IonIcon icon={chevronForward} slot="end" />
              <IonRippleEffect />
            </IonItem>
          ))}

          <IonItemDivider>
            <IonLabel>DISPLAY COMPONENTS</IonLabel>
          </IonItemDivider>

          {components.slice(4).map((component, index) => (
            <IonItem
              key={index + 4}
              id={`component-${index + 4}`}
              detail={false}
              className="ion-activatable"
              onClick={() =>
                handleItemClick(component.route, `component-${index + 4}`)
              }
              lines="full"
              button
            >
              <IonIcon
                icon={component.icon}
                slot="start"
                className="component-icon"
              />
              <IonLabel>
                <h2>{component.name}</h2>
                <p>{component.description}</p>
              </IonLabel>
              <IonIcon icon={chevronForward} slot="end" />
              <IonRippleEffect />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
