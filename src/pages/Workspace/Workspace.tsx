import React from "react";
import styles from "./Workspace.module.css";
import { IonPage, IonContent } from "@ionic/react";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import WorkspaceInputCard from "../../components/WorkspaceInputCard/WorkspaceInputCard";
import ImageInputClass from "../../libs/ImageInputClass";

interface Props {}

class Workspace extends React.Component<Props, {}> {
  state = {
    classes: [new ImageInputClass(1), new ImageInputClass(2)],
  };
  componentDidMount() {
      ;
  }
  render() {
    return (
      <IonPage>
        <AppBar title="VLab - New Project" menu />
        <SideBar />
        <IonContent className={styles.content}>
          <WorkspaceInputCard class={this.state.classes[0]} />
          <WorkspaceInputCard class={this.state.classes[1]} />
        </IonContent>
      </IonPage>
    );
  }
}

export default Workspace;
