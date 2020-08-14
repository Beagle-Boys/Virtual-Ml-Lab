import React from "react";
import {
  IonToolbar,
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonRouterLink,
  IonTitle,
  IonMenuToggle,
} from "@ionic/react";
import styles from "./AppBar.module.css";
import { menuOutline } from "ionicons/icons";

interface Props {
  background?: string;
  title?: string;
  menu?: boolean;
  extras?: boolean;
}

class AppBar extends React.Component<Props, {}> {
  render() {
    return (
      <IonHeader style={{ backgroundColor: this.props.background }} mode="ios">
        <IonToolbar className={styles.toolbar} mode="ios">
          {this.props.title ? <IonTitle>{this.props.title}</IonTitle> : null}
          <IonButtons slot="secondary">
            {this.props.menu ? (
              <IonMenuToggle>
                <IonButton className={styles.button}>
                  <IonIcon
                    className={styles.menuIcon}
                    slot="icon-only"
                    icon={menuOutline}
                  />
                </IonButton>
              </IonMenuToggle>
            ) : null}
          </IonButtons>
          {this.props.extras?<IonButtons className={styles.rightButton} slot="primary">
            <IonButton className={styles.button}>
              <IonRouterLink
                className={`${styles.text} ${styles.underline}`}
                href="/about"
                color="dark"
              >
                About
              </IonRouterLink>
            </IonButton>
            <IonButton className={styles.button}>
              <IonRouterLink className={styles.text} href="/faq" color="dark">
                FAQ
              </IonRouterLink>
            </IonButton>
            <IonButton fill="solid" className={styles.button}>
              <IonRouterLink href="/train">Get Started</IonRouterLink>
            </IonButton>
          </IonButtons>:null}
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default AppBar;
