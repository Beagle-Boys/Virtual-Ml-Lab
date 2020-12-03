import React, { Component } from 'react';
import styles from "./Regression.module.css";
import { IonPage, IonContent } from "@ionic/react";
import AppBar from "../../components/AppBar/AppBar";
import CanvasJSReact from "../../libs/canvasjs.react";

export class Regression extends Component {
    render() {
        var CanvasJS = CanvasJSReact.CanvasJS;
        var CanvasJSChart = CanvasJSReact.CanvasJSChart;
        const options = {
            title: {
              text: "Test Chart"
            },
            data: [{				
                      type: "scatter",
                      dataPoints: [
                          { label: "Apple", x: 1, y: 10  },
                          { label: "Orange", x: 2, y: 15  },
                          { label: "Banana", x: 3, y: 25  },
                          { label: "Mango", x: 4,  y: 30  },
                          { label: "Grape", x: 5,  y: 28  }
                      ]
             }]
         }
        return (
            <IonPage>
                <AppBar title="VLab - New Project" menu />
                <IonContent class={styles.bgColor}>
                    <div className={styles.container}>
                        <div className={styles.inputCon}>
                            <div className={styles.inputBox}>
                                <div className={styles.inputTitle}>Input :</div>
                                <div className={styles.inputSheet}></div>
                                <div className={styles.trainBtn}>TRAIN</div>
                            </div>
                        </div>
                        <div className={styles.divdiv}></div>
                        <div className={styles.outputCon}>
                                <div className={styles.outputBox}>
                                    <CanvasJSChart className={styles.chart} options = {options}
                                        /* onRef = {ref => this.chart = ref} */
                                    />
                                </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

export default Regression
