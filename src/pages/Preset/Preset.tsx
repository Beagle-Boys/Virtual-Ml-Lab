import React, { Component } from 'react';
import { RouteProps } from 'react-router';
import styles from './Preset.module.css';
import { IonPage, IonContent } from "@ionic/react";
import AppBar from "../../components/AppBar/AppBar";
import ProjectsContainer from '../../components/ProjectsContainer/ProjectsContainer';

interface Props {
    location: any
}

export class Preset extends Component<Props & RouteProps> {
    render() {
        return (
        <IonPage>
        <AppBar title="Virtual AI Lab" />
        <IonContent className={styles.bg}>
            <ProjectsContainer data={this.props.location.state}/>
        </IonContent>
        </IonPage>
        )
    }
}

export default Preset
