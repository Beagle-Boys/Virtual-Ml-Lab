import React from "react";
import styles from "./WorkspaceInputCard.module.css";
import Paper from "../Paper/Paper";
import ImageInputClass from "../../libs/ImageInputClass";
import { ellipsisVertical } from "ionicons/icons";
import { Input, Dropdown } from "antd";
import { IonIcon, IonItem } from "@ionic/react";
import ImageButton from "../ImageButton/ImageButton";
import PicturesWall from "../PicturesWall/PicturesWall";
import { UploadFile } from "antd/lib/upload/interface";
import NeuralNetwork from "../../libs/NeuralNetwork";

interface Props {
  className?: string;
  class: ImageInputClass;
  neuralNetwork: NeuralNetwork;
  onChange?: (val: ImageInputClass) => void;
  optionClicked?: (
    option: "delete" | "disable" | "remove" | "download" | "save",
    classObject: ImageInputClass
  ) => void;
  onRendered?: () => void;
}

const toBase64: (
  file: File | Blob
) => Promise<string | ArrayBuffer | null | ProgressEvent<FileReader>> = (
  file: File | Blob
) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

class WorkspaceInputCard extends React.Component<Props, {}> {
  state: { class: ImageInputClass; webcam: boolean } = {
    class: this.props.class,
    webcam: false,
  };
  webcamELement = React.createRef<HTMLVideoElement>();
  onClassNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let tclass = this.state.class;
    tclass.className = ev.target.value || "";
    if (this.props.onChange) return this.props.onChange(tclass);
    return this.setState({ class: tclass });
  };
  clickImage = () => {
    if (this.webcamELement.current)
      this.state.class.addImage(
        this.webcamELement.current,
        this.props.neuralNetwork
      );
  };
  dropdown = (
    <>
      <IonItem
        onClick={() => {
          if (this.props.optionClicked)
            this.props.optionClicked("delete", this.state.class);
        }}
        lines="none"
        button
      >
        Delete Class
      </IonItem>
      <IonItem
        onClick={() => {
          if (this.props.optionClicked)
            this.props.optionClicked("disable", this.state.class);
        }}
        lines="none"
        button
      >
        Disable Class
      </IonItem>
      <IonItem
        onClick={() => {
          if (this.props.optionClicked)
            this.props.optionClicked("remove", this.state.class);
        }}
        lines="none"
        button
        disabled
      >
        Remove All Samples
      </IonItem>
      <IonItem
        onClick={() => {
          if (this.props.optionClicked)
            this.props.optionClicked("download", this.state.class);
        }}
        lines="none"
        button
        disabled
      >
        Download Samples
      </IonItem>
      <IonItem
        onClick={() => {
          if (this.props.optionClicked)
            this.props.optionClicked("save", this.state.class);
        }}
        lines="none"
        button
        disabled
      >
        Save Samples to Drive
      </IonItem>
    </>
  );
  onAddImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;
    let tfile = [...this.state.class.images];
    for (let i = 0; files && i < files?.length; i++) {
      let url = await toBase64(files[i]);
      let file: UploadFile = {
        name: files[i].name,
        uid: `${tfile.length}`,
        url: typeof url === "string" ? url : "",
        status: "done",
        size: files[i].size,
        type: files[i].type,
      };
      tfile.push(file);
    }
    this.state.class.images = tfile;
    if (this.props.onChange) return this.props.onChange(this.state.class);
    this.setState({ class: this.state.class });
  };

  componentDidMount = () => {
    if (this.props.onRendered) return this.props.onRendered();
  };

  imageInputRef = React.createRef<HTMLInputElement>();
  render() {
    return (
      <Paper className={`${this.props.className} ${styles.card}`}>
        <input
          onChange={this.onAddImages}
          multiple
          ref={this.imageInputRef}
          style={{ display: "none" }}
          type="file"
          accept="image/png, image/jpeg"
        />
        {this.state.webcam ? (
          <video
            autoPlay
            playsInline
            muted
            ref={this.webcamELement}
            id="webcam"
            onClick={this.clickImage}
            width="224"
            height="224"
          ></video>
        ) : null}
        <IonItem>
          <Input
            value={this.state.class.className}
            onChange={this.onClassNameChange}
            bordered={false}
            className={styles.name}
          />
          <Dropdown overlay={this.dropdown} placement="bottomLeft" arrow>
            <IonIcon icon={ellipsisVertical} />
          </Dropdown>
        </IonItem>
        <div className={styles.section}>
          Add Image Samples:
          <div className={styles.images}>
            <div className={styles.button}>
              <ImageButton
                onClick={() => this.setState({ webcam: !this.state.webcam })}
                label="Webcam"
                image="webcam"
              />
              <ImageButton
                onClick={() => this.imageInputRef.current?.click()}
                label="Upload"
                image="upload"
              />
            </div>
            <PicturesWall
              onChange={(uid) => {
                this.setState({
                  images: this.state.class.images.filter(
                    (img) => img.uid !== uid
                  ),
                });
              }}
              files={this.state.class.images}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

export default WorkspaceInputCard;
