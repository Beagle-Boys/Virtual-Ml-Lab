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

interface Props {
  className?: string;
  class: ImageInputClass;
  onChange?: (val: ImageInputClass) => void;
  optionClicked?: (
    option: "delete" | "disable" | "remove" | "download" | "save",
    classObject: ImageInputClass
  ) => void;
  onRendered?: () => void;
}

const transformFile: (file: File) => Promise<Blob | null> = (file: File) => {
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
        let ctx = canvas.getContext("2d");
        if (ctx === null) return;
        ctx.drawImage(img, 0, 0, 224, 224);
        canvas.toBlob((callback) => {
          resolve(callback);
        });
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
  state: { class: ImageInputClass } = {
    class: this.props.class,
  };
  onClassNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let tclass = this.state.class;
    tclass.className = ev.target.value || "";
    if (this.props.onChange) return this.props.onChange(tclass);
    return this.setState({ class: tclass });
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
    let tfile = this.state.class.images;
    for (let i = 0; files && i < files?.length; i++) {
      let tform = await transformFile(files[i]);
      if (!tform) continue;
      let url = await toBase64(tform);
      let file: UploadFile = {
        name: files[i].name,
        uid: `${tfile.length}`,
        url: typeof url === "string" ? url : "",
        status: "done",
        size: files[i].size,
        type: files[i].type,
      };
      tfile.push(file);
      this.state.class.images = tfile;
      if (this.props.onChange) return this.props.onChange(this.state.class);
      this.setState({ class: this.state.class });
    }
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
              <ImageButton label="Webcam" image="webcam" />
              <ImageButton
                onClick={() => this.imageInputRef.current?.click()}
                label="Upload"
                image="upload"
              />
            </div>
            <PicturesWall
              onChange={(uid) => {
                this.setState({
                  images: this.state.class.images.filter((img) => img.uid !== uid),
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
