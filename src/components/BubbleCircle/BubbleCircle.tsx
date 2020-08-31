import React from "react";
import { Link } from "react-router-dom";
import { IonItem } from "@ionic/react";
import styles from "./BubbleCircle.module.css";

interface BubbleProps {
  text: string;
  img?: string;
}

class BubbleCircle extends React.Component<BubbleProps, {}> {
  render() {
    const img_name = (this.props.text === 'Beginner') ? 'brain' : 'int';
    return (
        <Link to={{pathname : "/preset",state: this.props.text}} >
        <div className={styles.bubbleCon}>
        <div className={styles.levelInfo}>
          <p style={{ width: "fit-content", margin: "0 auto" }}><img src={require(`../../assets/${img_name}.png`)} alt="img"></img></p>
          <p style={{ width: "fit-content", margin: "0 auto" }}>{this.props.text}</p>
        </div>
        </div>
        </Link>
    );
  }
}

export default BubbleCircle;