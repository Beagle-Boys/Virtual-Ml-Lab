import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
import styles from './Home.module.css';
import AppBar from '../../components/AppBar/AppBar';
import SideBar from '../../components/SideBar/SideBar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppBar />
      <SideBar title="Teachable Machine" />
      <IonContent className={styles.bg} style={{margin: 'auto'}}>
        <Container />
      </IonContent>
    </IonPage>
  );
};

function Container() {
  return (
    <div className={styles.container}>
      <BubbleCircle text='Beginner' />
      <BubbleCircle text='Intermediate' />
    </div>
  )
}

function BubbleCircle(props: any) {
  return (
    <div className={styles.bubbleCon}>
      <div className={styles.levelInfo}>
        <p style={{width: 'fit-content' ,margin: 'auto'}}>[img]</p>
        <p>{props.text}</p>
      </div>
    </div>
  )
}


export default Home;