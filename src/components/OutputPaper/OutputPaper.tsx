import React from "react";
import styles from "./OutputPaper.module.css";
import Paper from "../Paper/Paper";

interface Props {
  reff?: React.RefObject<HTMLDivElement>;
}

class OutputPaper extends React.Component<Props, {}> {
  render() {
    return (
      <Paper reff={this.props.reff} className={styles.paper}>
        <div className={styles.section}>
          <div className={styles.label}>Preview</div>
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
          <div className={`${styles.section} ${styles.noborder}`}>
            <div className={styles.inputcontainer} style={{ display: "block" }}>
              <p style={{ fontSize: 14, color: "#5F6368", margin: 0 }}>
                You must train a model on the left before you can preview it
                here.
              </p>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default OutputPaper;
