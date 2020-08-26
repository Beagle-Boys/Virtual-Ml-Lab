import React, { Component } from 'react'
import styles from './Preset.module.css';
import { IonPage, IonContent } from "@ionic/react";
import AppBar from "../../components/AppBar/AppBar";
import ProjectsContainer from '../../components/ProjectsContainer/ProjectsContainer';

export class Preset extends Component {
    render() {
        return (
        <IonPage>
        <AppBar title="Virtual AI Lab" />
        <IonContent className={styles.bg}>
            <ProjectsContainer />
        </IonContent>
        </IonPage>
        )
    }
}

export default Preset
