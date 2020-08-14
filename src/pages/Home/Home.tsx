import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import styles from "./Home.module.css";
import AppBar from "../../components/AppBar/AppBar";
import Container from "../../components/Container/Container";

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppBar title="Virtual AI Lab" />
      <IonContent className={styles.bg}>
        <Container />
      </IonContent>
    </IonPage>
  );
};

export default Home;
