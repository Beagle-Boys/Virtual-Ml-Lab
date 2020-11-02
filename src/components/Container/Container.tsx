import React from "react";
import styles from "./Container.module.css";
import { Link } from "react-router-dom";

class Container extends React.Component {
  render() {
    return (
      <>
      <div className={styles.topSection}>
        <div className={styles.topCon}>
          <div className={styles.infoTxt}>Start Using Machine Learning<br/> in Interactive Way</div>
          <Link to={{pathname : "/preset",state: "nothing"}} >
          <div className={styles.strtBtn}>Get Started</div></Link>
        </div>
      </div>
      <div className={styles.belowSection}>
        <div className={styles.belowCon}>
          <div className={styles.toolTitle}>Types of tools provided by us</div>
          <div className={styles.algoList}>
            <div className={styles.algoCard}></div>
            <div className={styles.algoCard}></div>
            <div className={styles.algoCard}></div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Container;