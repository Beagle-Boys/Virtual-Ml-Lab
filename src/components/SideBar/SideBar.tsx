import React from "react";
import styles from "./SideBar.module.css";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  IonTitle,
  IonIcon,
  IonText,
  IonItemDivider,
} from "@ionic/react";
import { logoDropbox } from "ionicons/icons";

interface Props {
  title?: string;
}

class SideBar extends React.Component<Props, {}> {
  render() {
    return (
      <>
        <IonMenu
          side="start"
          swipeGesture={true}
          className={styles.menu}
          contentId="menuContent"
        >
          <IonHeader className={styles.header}>
            <IonToolbar className={styles.toolbar}>
              {this.props.title ? (
                <IonTitle className={styles.title}>{this.props.title}</IonTitle>
              ) : null}
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Open Project from Drive</IonText>
              </IonItem>
              <IonItem disabled lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Save Project to Drive</IonText>
              </IonItem>
              <IonItem disabled lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>View Project in Drive</IonText>
              </IonItem>
              <IonItem disabled lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Make Copy in Drive</IonText>
              </IonItem>
              <IonItem disabled lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Sign Out of Drive</IonText>
              </IonItem>
              <IonItemDivider />
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Open Project from File</IonText>
              </IonItem>
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Download Project as file</IonText>
              </IonItem>
              <IonItemDivider />
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>About Teachable Machine</IonText>
              </IonItem>
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>FAQ</IonText>
              </IonItem>
              <IonItemDivider />
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>1. Gather Sample</IonText>
              </IonItem>
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>2. Train your model</IonText>
              </IonItem>
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>3. Export your model</IonText>
              </IonItem>
              <IonItemDivider />
              <IonItem lines="none" className={styles.item} href="#">
                <IonIcon className={styles.icon} icon={logoDropbox} />
                <IonText>Send Feedback</IonText>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="menuContent"></IonRouterOutlet>
      </>
    );
  }
}

export default SideBar;
