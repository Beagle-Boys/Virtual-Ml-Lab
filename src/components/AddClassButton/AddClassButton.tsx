import React from "react";
import styles from "./AddClassButton.module.css";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

class AddClassButton extends React.Component<Props, {}> {
  render() {
    return (
      <button className={styles.addClass} onClick={this.props.onClick}>
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.9961 0.25H2.33376C1.48838 0.25 0.810562 0.925 0.810562 1.75V12.25C0.810562 13.075 1.48838 13.75 2.33376 13.75H12.9961C13.8339 13.75 14.5193 13.075 14.5193 12.25V1.75C14.5193 0.925 13.8339 0.25 12.9961 0.25ZM12.9961 12.25H2.33376V1.75H12.9961V12.25ZM8.42654 10.75H6.90335V7.75H3.85695V6.25H6.90335V3.25H8.42654V6.25H11.4729V7.75H8.42654V10.75Z"
            fill="#80868B"
          ></path>
        </svg>
        Add a class
      </button>
    );
  }
}

export default AddClassButton;
