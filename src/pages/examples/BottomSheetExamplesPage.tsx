import React, { useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonModal,
  IonIcon,
  IonRippleEffect,
  IonText,
  createAnimation,
} from "@ionic/react";
import {
  closeOutline,
  addOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

const BottomSheetExamplesPage: React.FC = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const modalRef = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      setTasks([...tasks, taskName]);
      setTaskName("");
      modalRef.current?.dismiss();
    }
  };

  const handleTaskClick = (index: number) => {
    // Trigger card scale animation before navigating
    const card = document.getElementById(`task-card-${index}`);
    if (card) {
      const animation = createAnimation()
        .addElement(card)
        .duration(100)
        .easing("ease-out")
        .fromTo("transform", "scale(1)", "scale(0.97)")
        .afterStyles({
          transform: "scale(1)",
        });

      animation.play().then(() => {
        // Navigate to task detail page after animation completes
        history.push(`/examples/bottomsheet/task/${index}`);
      });
    } else {
      // Fallback if animation fails
      history.push(`/examples/bottomsheet/task/${index}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Bottom Sheet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <IonText>
              <h2>Bottom Sheet Component</h2>
              <p>Add tasks and manage them with a bottom sheet interface</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <div className="ion-padding">
          <IonButton expand="block" onClick={() => setIsBottomSheetOpen(true)}>
            <IonIcon slot="start" icon={addOutline} />
            Add Task
          </IonButton>

          {tasks.length === 0 ? (
            <div className="ion-text-center ion-padding">
              <IonText color="medium">
                <p>No tasks yet. Add your first task to get started!</p>
              </IonText>
            </div>
          ) : (
            <IonList>
              {tasks.map((task, index) => (
                <IonCard
                  key={index}
                  id={`task-card-${index}`}
                  onClick={() => handleTaskClick(index)}
                  className="ion-activatable ion-margin-vertical"
                  style={{
                    cursor: "pointer",
                    transition:
                      "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                  }}
                >
                  <IonRippleEffect />
                  <IonCardHeader>
                    <IonCardSubtitle>Task {index + 1}</IonCardSubtitle>
                    <IonCardTitle className="ion-text-wrap">
                      {task}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>Tap to view details</div>
                      <IonIcon icon={chevronForwardOutline} />
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
          )}
        </div>

        {/* Bottom Sheet Modal */}
        <IonModal
          ref={modalRef}
          isOpen={isBottomSheetOpen}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5, 0.75]}
          onDidDismiss={() => setIsBottomSheetOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add New Task</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsBottomSheetOpen(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Task Name</IonLabel>
              <IonInput
                value={taskName}
                onIonChange={(e) => setTaskName(e.detail.value!)}
                placeholder="Enter task description"
              />
            </IonItem>
            <IonButton
              expand="block"
              onClick={handleAddTask}
              className="ion-margin-top"
            >
              Add Task
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default BottomSheetExamplesPage;
