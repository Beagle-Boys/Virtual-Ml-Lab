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
import Regression from "../../components/Regression/Regression";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { MobileNet } from "@tensorflow-models/mobilenet";
import NeuralNetwork from "../../libs/NeuralNetwork";

interface Props { 
  location: any
}

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
    if (this.props.location.state[1].selected == 1)
      return(<Regression />);
    else
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
                  /> : 
                  <div className={styles.paper1}>
                    <div className={styles.section1}>
                      <div className={styles.label1}>Preview</div>
                      <button disabled>
                        <slot name="icon"></slot>
                        <svg
                          className={styles.actionbtnicon}
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="
                                M11.9997 4.49992H13.6663V1.99992C13.6663 1.08325 12.9163 0.333252 11.9997 0.333252H1.99967C1.08301 0.333252 0.333008 1.08325 0.333008 1.99992V4.49992H1.99967V1.99992H11.9997V4.49992ZM6.16634 6.85825L4.00801 9.00825L2.83301 7.83325L6.99967 3.66659L11.1663 7.83325L9.99134 9.01659L7.83301 6.85825V13.6666H6.16634V6.85825Z
                                "
                          ></path>
                        </svg>
                        <span>Export Model</span>
                      </button>
                    </div>
                    <div id={styles.bodycontainer}>
                      <div className={`${styles.section1} ${styles.noborder}`}>
                        <div className={styles.inputcontainer} style={{ display: "block" }}>
                          <div style={{height: 224, width: 224, background: 'rgb(200, 200, 200)'}}></div>
                          {"Input Data"}
                        </div>
                      </div>
                    </div>  
                  </div>}
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
  }
}

export default Workspace;
