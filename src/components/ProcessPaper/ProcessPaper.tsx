import React from "react";
import styles from "./ProcessPaper.module.css";
import Paper from "../Paper/Paper";
import { IonButton, IonIcon } from "@ionic/react";
import { Collapse, Tooltip } from "antd";
import { helpCircleOutline } from "ionicons/icons";

interface Props {}

class ProcessPaper extends React.Component<Props, {}> {
  render() {
    return (
      <Paper className={styles.paper}>
        <div className={styles.section}>
          <div className={styles.label}>Training</div>
          <IonButton className={styles.button}>Train Model</IonButton>
        </div>
        <Collapse expandIconPosition="right">
          <Collapse.Panel header="Advanced" key={1}>
            <div className={styles.settingbox}>
              <div className={styles.settingrow}>
                <span>
                  Epochs:
                  <div className={styles.inputholder}>
                    <input
                      type="number"
                      min="1"
                      maxLength={4}
                      defaultValue={50}
                      className={styles.inputNumber}
                      max="9999"
                    />
                  </div>
                </span>
                <Tooltip
                  title={
                    <>
                      <div className={styles.tooltiptitle}>Epochs</div>
                      <div className={styles.tooltiptext}>
                        <p>
                          One epoch means that each and every sample in the
                          training dataset has been fed through the training
                          model at least once. If your epochs are set to 50, for
                          example, it means that the model you are training will
                          work through the entire training dataset 50 times.
                          Generally the larger the number, the better your model
                          will learn to predict the data.
                        </p>
                        <p>
                          You probably want to tweak (usually increase) this
                          number until you get good predictive results with your
                          model.
                        </p>
                      </div>
                    </>
                  }
                >
                  <IonIcon
                    style={{ width: "20px", height: "20px" }}
                    icon={helpCircleOutline}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={styles.settingbox}>
              <div className={styles.settingrow}>
                <span>
                  Batch Size:
                  <div className={styles.inputholder}>
                    <select>
                      <option value="16" selected>
                        16
                      </option>
                      <option value="32">32</option>
                      <option value="64">64</option>
                      <option value="128">128</option>
                      <option value="256">256</option>
                      <option value="512">512</option>
                    </select>
                  </div>
                </span>
                <Tooltip
                  title={
                    <>
                      <div className={styles.tooltiptitle}>Batch Size:</div>
                      <div className={styles.tooltiptext}>
                        <p>
                          A batch is a set of samples used in one iteration of
                          training. For example, let's say that you have 80
                          images and you choose a batch size of 16. This means
                          the data will be split into 80 / 16 = 5 batches. Once
                          all 5 batches have been fed through the model, exactly
                          one epoch will be complete.
                        </p>
                        <p>
                          You probably won't need to tweak this number to get
                          good training results.
                        </p>
                      </div>
                    </>
                  }
                >
                  <IonIcon
                    style={{ width: "20px", height: "20px" }}
                    icon={helpCircleOutline}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={styles.settingbox}>
              <div className={styles.settingrow}>
                <span>
                  Learning Rate:
                  <div className={styles.inputholder}>
                    <input
                      type="number"
                      maxLength={6}
                      min="0.00001"
                      max="0.1"
                      style={{ width: "80px", marginLeft: "0px" }}
                      defaultValue={0.001}
                      step="0.00001"
                    />
                  </div>
                </span>
                <Tooltip
                  title={
                    <>
                      <div className={styles.tooltiptitle}>Learning Rate</div>
                      <div className={styles.tooltiptext}>
                        Be careful tweaking this number! Even small differences
                        can have huge effects on how well your model learns.
                      </div>
                    </>
                  }
                >
                  <IonIcon
                    style={{ width: "20px", height: "20px" }}
                    icon={helpCircleOutline}
                  />
                </Tooltip>
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`${styles.section} ${styles.topborder}`}
              arial-label="Reset Defaults"
            >
              <div
                className={styles.suboption}
                style={{ padding: "0", paddingRight: "15px" }}
              >
                Reset Defaults
                <span
                  className={styles.suboptioniconwrap}
                  style={{ height: "22px", width: "22px" }}
                >
                  <svg
                    className={styles.suboptionicon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6.01V4H2V10H8V8H5.09C6.47 5.61 9.04 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12H2C2 17.52 6.48 22 12.01 22C17.53 22 22 17.52 22 12C22 6.48 17.53 2 12.01 2C8.73 2 5.83 3.58 4 6.01ZM13 6V12L17.23 14.94L15.97 16.49L11 13V6H12H13Z"
                      fill="#9AA0A6"
                    ></path>
                  </svg>
                  <span></span>
                </span>
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`${styles.section} ${styles.topborder}`}
              arial-label="Under the Hood"
            >
              <div
                className={styles.suboption}
                style={{ padding: "0", paddingRight: "15px" }}
              >
                Under the hood
                <span
                  className={styles.suboptioniconwrap}
                  style={{ height: "22px", width: "22px" }}
                >
                  <svg
                    className={styles.suboptionicon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      fill="#9AA0A6"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 10H12V14H14V10ZM10 4H8V14H10V4ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM6 7H4V14H6V7Z"
                    ></path>
                  </svg>
                  <span></span>
                </span>
                <span></span>
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
      </Paper>
    );
  }
}

export default ProcessPaper;
