import React from "react";
import styles from "./WorkspaceInputCard.module.css";
import Paper from "../Paper/Paper";
import { ellipsisVertical } from "ionicons/icons";
import { Input, Dropdown } from "antd";
import { IonIcon, IonItem } from "@ionic/react";
import ImageButton from "../ImageButton/ImageButton";
import PicturesWall from "../PicturesWall/PicturesWall";
import { UploadFile } from "antd/lib/upload/interface";
import NeuralNetwork from "../../libs/NeuralNetwork";
import * as tf from "@tensorflow/tfjs";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

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

const toImage: (file: File) => Promise<HTMLImageElement> = (file: File) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = 224;
      canvas.height = 224;
      let img = document.createElement("img");
      img.src = typeof reader.result === "string" ? reader.result : "";
      img.onload = () => {
        resolve(img);
      };
    };
  });
};

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
  webcam: WebcamIterator | null = null;

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
      let image = await toImage(files[i]);
      let url = await toBase64(files[i]);
      let file: UploadFile = {
        name: files[i].name,
        uid: `${tfile.length}`,
        url: typeof url === "string" ? url : "",
        status: "done",
        size: files[i].size,
        type: files[i].type,
      };
      tfile.push({ img: image, options: file });
      this.state.class.uploadImage(image, this.props.neuralNetwork,file);
    }
    //this.state.class.images = tfile;
    if (this.props.onChange) return this.props.onChange(this.state.class);
    //this.setState({ class: this.state.class });
  };

  componentDidMount = () => {
    this.props.class.onUpdated = (instance) =>
      this.setState({ class: instance });
    if (this.props.onRendered) return this.props.onRendered();
  };

  async componentDidUpdate() {
    if (this.webcamELement.current) {
      this.webcam = await tf.data.webcam(this.webcamELement.current);
    }
  }

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
                    (img) => img.options.uid !== uid
                  ),
                });
              }}
              files={this.state.class.images.map((v) => v.options)}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

class ImageInputClass {
  className: string = "Class 0";
  number: number = 0;
  disabled: boolean = false;
  images: { img: HTMLImageElement; options: UploadFile }[] = [];
  rendered: boolean = false;
  webcam: WebcamIterator | null = null;
  onUpdated: (instance: ImageInputClass) => void = console.log;

  constructor(className?: string | number) {
    if (typeof className === "string") this.className = className;
    if (typeof className === "number") {
      this.className = `Class ${className}`;
      this.number = className;
    }
  }
  addImage = async (
    videoElement: HTMLVideoElement,
    neuralNetwork: NeuralNetwork
  ) => {
    this.webcam = await tf.data.webcam(videoElement);

    let canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    this.uploadImage(canvas, neuralNetwork);
    canvas.remove();

    /*let img = await this.webcam.capture();
    let activation = neuralNetwork.net?.infer(img, true);
    img.dispose();
    if (!activation) return;
    neuralNetwork.classifier.addExample(activation, this.className);*/
  };
  uploadImage = (
    image: HTMLCanvasElement | HTMLImageElement,
    neuralNetwork: NeuralNetwork,
    upfile?: UploadFile
  ) => {
    let activation = neuralNetwork.net?.infer(image, true);
    if (!activation) return;
    neuralNetwork.classifier.addExample(activation, this.className);

    let file: UploadFile = upfile
      ? upfile
      : {
          name: `${this.images.length + 1}`,
          uid: `${this.images.length + 1}`,
          url:
            image instanceof HTMLImageElement ? image.src : image.toDataURL(),
          status: "done",
          size: 10,
          type: "image",
        };
    let imge = image instanceof HTMLImageElement ? image : null;
    if (image instanceof HTMLCanvasElement) {
      imge = document.createElement("img");
      imge.src = image.toDataURL();
    }
    this.images.push({
      img: imge ? imge : document.createElement("img"),
      options: file,
    });
    image.remove();
    this.onUpdated(this);
  };
}

export {WorkspaceInputCard, ImageInputClass};
