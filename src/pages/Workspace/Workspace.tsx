import React from "react";
import styles from "./Workspace.module.css";
import { IonPage, IonContent } from "@ionic/react";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import AddClassButton from "../../components/AddClassButton/AddClassButton";
import Paper from "../../components/Paper/Paper";
import ProcessPaper from "../../components/ProcessPaper/ProcessPaper";
import OutputPaper from "../../components/OutputPaper/OutputPaper";
import InputCard from "../../components/WorkspaceInputCard/InputCard";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { MobileNet } from "@tensorflow-models/mobilenet";
import NeuralNetwork from "../../libs/NeuralNetwork";

interface Props { }

class Workspace extends React.Component<Props, {}> {
  state:
    {
      classes: {
        card: JSX.Element,
        ref: React.RefObject<InputCard>
      }[],
      neuralNetwork: NeuralNetwork | null,
      classifier: knnClassifier.KNNClassifier | null,
      net: MobileNet | null;
    } = {
      classes: [],
      neuralNetwork: null,
      net: null,
      classifier: null
    };
  processCardRef = React.createRef<ProcessPaper>();
  addClass = () => {
    let inputCardRef = React.createRef<InputCard>();
    let newclass = <InputCard
      key={this.state.classes.length + 1}
      ref={inputCardRef}
      sequence={this.state.classes.length + 1}
    />;
    let cards = this.state.classes;
    cards.push({
      card: newclass,
      ref: inputCardRef
    });
    this.setState({ classes: cards });
  }
  componentDidMount() {
    this.addClass();
    this.addClass();
  }

  render() {
    return (
      <IonPage>
        <AppBar title="VLab - New Project" menu />
        <SideBar />
        <IonContent className={styles.content}>
          <div className={styles.cont_flex}>
            <div className={styles.inpFlex}>
              {this.state.classes.map(v => v.card)}
              <Paper className={styles.paper}>
                <AddClassButton
                  onClick={this.addClass}
                />
              </Paper>
            </div>
            <div className={styles.processFlex}>
              <ProcessPaper
                onTrained={(nn, cl, net) => {
                  this.setState({
                    neuralNetwork: nn,
                    net: net,
                    classifier: cl
                  })
                }}
                ref={this.processCardRef}
                classes={this.state.classes} />
            </div>
            <div className={styles.outputFlex}>
              {this.state.classifier && this.state.net && this.state.neuralNetwork ?
                <OutputPaper
                  neuralNetwork={this.state.neuralNetwork}
                  classifier={this.state.classifier}
                  mobnet={this.state.net}
                /> : null}
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Workspace;
