import React from "react";
import styles from "./Workspace.module.css";
import { IonPage, IonContent } from "@ionic/react";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import WorkspaceInputCard from "../../components/WorkspaceInputCard/WorkspaceInputCard";
import ImageInputClass from "../../libs/ImageInputClass";
import AddClassButton from "../../components/AddClassButton/AddClassButton";
import Paper from "../../components/Paper/Paper";
import ProcessPaper from "../../components/ProcessPaper/ProcessPaper";
import OutputPaper from "../../components/OutputPaper/OutputPaper";
import NeuralNetwork from "../../libs/NeuralNetwork";

interface Props {
  location: any
}

class Workspace extends React.Component<Props, {}> {
  state = {
    classes: [new ImageInputClass(0), new ImageInputClass(1)],
    neuralNetwork: new NeuralNetwork(),
  };

  render() {
    return (
      <IonPage>
        <AppBar title={this.props.location.state[1] === "new" ? "VLab - New Project" : "VLab"} menu />
        <SideBar />
        <IonContent className={styles.content}>
          <div className={styles.cont_flex}>
            <div className={styles.inpFlex}>
              {this.state.classes.map((v, i) => (
                <WorkspaceInputCard
                  optionClicked={(option, classObj) => {
                    if (option === "delete") {
                      let list = this.state.classes.filter(
                        (v, ind) => ind !== i
                      );
                      return this.setState({ classes: list });
                    }
                  }}
                  key={i}
                  class={v}
                  neuralNetwork={this.state.neuralNetwork}
                />
              ))}
              <Paper className={styles.paper}>
                <AddClassButton
                  onClick={() => {
                    this.setState({
                      classes: [
                        ...this.state.classes,
                        new ImageInputClass(this.state.classes.length + 1),
                      ],
                    });
                  }}
                />
              </Paper>
            </div>
            <div className={styles.processFlex}>
              <ProcessPaper neuralNetwork={this.state.neuralNetwork} />
            </div>
            <div className={styles.outputFlex}>
              <OutputPaper neuralNetwork={this.state.neuralNetwork} />
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Workspace;
