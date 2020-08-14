import React from "react";
import styles from "./BubbleCircle.module.css";

interface BubbleProps {
  text: string;
  img?: string;
}

class BubbleCircle extends React.Component<BubbleProps, {}> {
  render() {
    return (
      <div className={styles.bubbleCon}>
        <div className={styles.levelInfo}>
          <p style={{ width: "fit-content", margin: "auto" }}>[img]</p>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}

export default BubbleCircle;