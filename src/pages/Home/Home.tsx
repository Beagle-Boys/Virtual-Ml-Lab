import { IonPage } from '@ionic/react';
import React from 'react';
import './Home.css';
import AppBar from '../../components/AppBar/AppBar';
import SideBar from '../../components/SideBar/SideBar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppBar />
      <SideBar title="Teachable Machine" />
    </IonPage>
  );
};

export default Home;