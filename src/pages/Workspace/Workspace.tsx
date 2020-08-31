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

interface Props {}

class Workspace extends React.Component<Props, {}> {
  state = {
    classes: [
      {
        backend: new ImageInputClass(1),
        frontend: React.createRef<WorkspaceInputCard>(),
      },
      {
        backend: new ImageInputClass(2),
        frontend: React.createRef<WorkspaceInputCard>(),
      },
    ],
    neuralNetwork: new NeuralNetwork(),
  };
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }
  //needs update
  //am planning to create an update function that'll be called when the children are rendered
  update = () => {
    if (
      !this.processPaper.current ||
      !this.outputPaper.current ||
      !this.processToOutput.current
    )
      return;
    //console.log(this.processPaper.current);
    let x1 =
      this.processPaper.current.offsetLeft +
      this.processPaper.current.clientWidth / 2;
    let y1 =
      this.processPaper.current.offsetTop +
      this.processPaper.current.clientHeight / 2;
    let x2 =
      this.outputPaper.current.offsetLeft +
      this.outputPaper.current.clientWidth / 2;
    let y2 =
      this.outputPaper.current.offsetTop +
      this.outputPaper.current.clientHeight / 2;
    this.processToOutput.current.setAttribute("x1", `${x1}`);
    this.processToOutput.current.setAttribute("x2", `${x2}`);
    this.processToOutput.current.setAttribute("y1", `${y1}`);
    this.processToOutput.current.setAttribute("y2", `${y2}`);
    //console.log(x1,x2,y1,y2);
  };
  processToOutput = React.createRef<SVGLineElement>();
  processPaper = React.createRef<HTMLDivElement>();
  outputPaper = React.createRef<HTMLDivElement>();
  render() {
    return (
      <IonPage>
        <AppBar title="VLab - New Project" menu />
        <SideBar />
        <IonContent className={styles.content}>
          <svg className={styles.svg}>
            <line ref={this.processToOutput} className={styles.line} />
          </svg>
          <div className={styles.cont_flex}>
            <div className={styles.inpFlex}>
              {this.state.classes.map((v, i) => (
                <WorkspaceInputCard
                  onRendered={this.update}
                  ref={v.frontend}
                  optionClicked={(option, classObj) => {
                    if (option === "delete") {
                      let list = this.state.classes.filter(
                        (v, ind) => ind !== i
                      );
                      return this.setState({ classes: list });
                    }
                  }}
                  onChange={(object) => {
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.classes[i].backend = object;
                    this.setState({ classes: this.state.classes });
                  }}
                  key={i}
                  class={v.backend}
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
              <ProcessPaper
                neuralNetwork={this.state.neuralNetwork}
                imageClasses={this.state.classes.map((v) => v.backend)}
                onRendered={this.update}
                reff={this.processPaper}
              />
            </div>
            <div className={styles.outputFlex}>
              <OutputPaper onRendered={this.update} reff={this.outputPaper} />
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Workspace;
