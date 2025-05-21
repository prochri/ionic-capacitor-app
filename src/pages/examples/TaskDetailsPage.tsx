import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonButton,
  IonBadge,
  useIonViewWillEnter,
  useIonViewWillLeave,
  createAnimation,
  Animation,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import {
  checkmarkCircleOutline,
  timeOutline,
  alertCircleOutline,
} from "ionicons/icons";

interface RouteParams {
  id: string;
}

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const taskIndex = parseInt(id, 10);

  // Since we don't have access to the actual tasks array from the parent,
  // we'll create a placeholder task for demonstration
  const task = `Example Task ${taskIndex + 1}`;

  let pageEnterAnimation: Animation;
  let cardAnimation: Animation;

  useIonViewWillEnter(() => {
    // Animation for the entire page
    pageEnterAnimation = createAnimation()
      .addElement(document.querySelector(".task-detail-page") as HTMLElement)
      .duration(300)
      .fromTo("opacity", "0.8", "1");

    // Card slide-in animation
    cardAnimation = createAnimation()
      .addElement(document.querySelector(".task-detail-card") as HTMLElement)
      .duration(400)
      .easing("cubic-bezier(0.36,0.66,0.04,1)")
      .fromTo("transform", "translateX(100%)", "translateX(0)");

    pageEnterAnimation.play();
    cardAnimation.play();
  });

  // Handle the back gesture animations
  useIonViewWillLeave(() => {
    if (pageEnterAnimation && cardAnimation) {
      pageEnterAnimation.direction("reverse");
      cardAnimation.direction("reverse");

      pageEnterAnimation.play();
      cardAnimation.play();
    }
  });

  // Set up a mock task status for the demo
  const taskStatus = ["In Progress", "Completed", "On Hold"][taskIndex % 3];
  const statusIcon = {
    "In Progress": timeOutline,
    Completed: checkmarkCircleOutline,
    "On Hold": alertCircleOutline,
  }[taskStatus];
  const statusColor = {
    "In Progress": "warning",
    Completed: "success",
    "On Hold": "medium",
  }[taskStatus];

  return (
    <IonPage className="task-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/examples/bottomsheet" text="Back" />
          </IonButtons>
          <IonTitle>Task Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="task-detail-card ion-padding">
          <IonCardHeader>
            <IonCardSubtitle>Task {taskIndex + 1}</IonCardSubtitle>
            <IonCardTitle>{task}</IonCardTitle>
            <div className="ion-padding-top">
              <IonBadge color={statusColor}>
                <IonIcon
                  icon={statusIcon}
                  style={{ marginRight: "5px" }}
                ></IonIcon>
                {taskStatus}
              </IonBadge>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <p>
              This is the detailed view of your task. Here you can see more
              information about the task, such as:
            </p>

            <IonItem lines="none">
              <IonLabel>Priority</IonLabel>
              <IonNote slot="end">Medium</IonNote>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>Due Date</IonLabel>
              <IonNote slot="end">1 week from now</IonNote>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>Assigned to</IonLabel>
              <IonNote slot="end">You</IonNote>
            </IonItem>

            <p className="ion-padding-top">
              This task was created as part of your bottom sheet example. You
              can swipe right to go back to the previous screen.
            </p>

            <div className="ion-padding-top">
              <IonButton expand="block" color={statusColor}>
                Mark as {taskStatus === "Completed" ? "Incomplete" : "Complete"}
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetailsPage;
