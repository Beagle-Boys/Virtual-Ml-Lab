import React from "react";
import styles from "./Paper.module.css";

interface Props {
  className?: string;
  id?: string;
}

class Paper extends React.Component<Props, {}> {
  render() {
    return (
      <div id={this.props.id || styles.id} className={`${this.props.className} ${styles.paper}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Paper;