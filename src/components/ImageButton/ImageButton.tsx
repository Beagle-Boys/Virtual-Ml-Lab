import React from "react";
import styles from "./ImageButton.module.css";

interface Props {
  image: "webcam" | "upload";
  label: string;
  fill?: string;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const webcamIcon = (fill?: string) => (
  <svg
    className={styles.samplesourceicon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={fill || "#1967D2"}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 6V10.48L22 6.5V17.5L18 13.52V14.52V18C18 19.1 17.1 20 16 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H16C17.1 4 18 4.9 18 6ZM16 14.52V9.69V6H4V18H16V14.52Z"
    ></path>
  </svg>
);

const uploadIcon = (fill?: string) => (
  <svg
    className={styles.samplesourceicon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={fill || "#1967D2"}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 7.83L8.41 10.41L7 9L12 4L17 9L15.59 10.42L13 7.83V16H11V7.83ZM6 15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18V18H6V15Z"
    ></path>
  </svg>
);

class ImageButton extends React.Component<Props, {}> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={styles.samplesourcebtn}
        title="Add sample: Webcam"
      >
        {this.props.image === "webcam"
          ? webcamIcon(this.props.fill)
          : uploadIcon(this.props.fill)}
        <span className={styles.samplesourcelabel}>{this.props.label}</span>
      </button>
    );
  }
}

export default ImageButton;