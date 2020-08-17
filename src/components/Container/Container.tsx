import React from "react";
import styles from "./Container.module.css";
import BubbleCircle from "../BubbleCircle/BubbleCircle";

class Container extends React.Component {
  render() {
    return (
      <>
      <div className={styles.lvlInfo}>
        Get Started by Selecting Level
      </div>
      <div className={styles.container}>
        <BubbleCircle text="Beginner" />
        <BubbleCircle text="Intermediate" />
      </div>
      </>
    );
  }
}

export default Container;