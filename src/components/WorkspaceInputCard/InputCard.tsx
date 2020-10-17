import React from "react";
import styles from "./WorkspaceInputCard.module.css";
import Paper from "../Paper/Paper";
import { ellipsisVertical } from "ionicons/icons";
import { Input, Dropdown } from "antd";
import { IonIcon, IonItem } from "@ionic/react";
import ImageButton from "../ImageButton/ImageButton";
import * as tf from "@tensorflow/tfjs";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

interface Props {
    sequence: number | string;
    className?: string;
    optionClicked?: (
        option: "delete" | "disable" | "remove" | "download" | "save",
        objectName: string
    ) => void;
}

class InputCard extends React.Component<Props, {}> {
    state: { webcam: boolean, objectName: string, images: HTMLCanvasElement[] } = {
        webcam: false,
        objectName: `Class ${this.props.sequence}`,
        images: []
    }
    dropdown = (
        <>
            <IonItem
                onClick={() => {
                    if (this.props.optionClicked)
                        this.props.optionClicked("delete", this.state.objectName);
                }}
                lines="none"
                button
            >
                Delete Class
          </IonItem>
            <IonItem
                onClick={() => {
                    if (this.props.optionClicked)
                        this.props.optionClicked("disable", this.state.objectName);
                }}
                lines="none"
                button
            >
                Disable Class
          </IonItem>
            <IonItem
                onClick={() => {
                    if (this.props.optionClicked)
                        this.props.optionClicked("remove", this.state.objectName);
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
                        this.props.optionClicked("download", this.state.objectName);
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
                        this.props.optionClicked("save", this.state.objectName);
                }}
                lines="none"
                button
                disabled
            >
                Save Samples to Drive
          </IonItem>
        </>
    );
    imageInputRef = React.createRef<HTMLInputElement>();
    webcamElement = React.createRef<HTMLVideoElement>();
    webcam: WebcamIterator | null = null;
    onAddImages: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    clickImage: ((event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => void) = async (event) => {
        if (!this.webcamElement.current) return;
        let canvasEl = document.createElement("canvas");
        canvasEl.width = 224;
        canvasEl.height = 224;
        canvasEl.getContext("2d")?.drawImage(this.webcamElement.current, 0, 0, 224, 224);
        let newImages = [...this.state.images, canvasEl];
        this.setState({ images: newImages });
    };

    async componentDidUpdate() {
        if (this.webcamElement.current) {
            this.webcam = await tf.data.webcam(this.webcamElement.current);
        }
    }

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
                        ref={this.webcamElement}
                        id="webcam"
                        onClick={this.clickImage}
                        width="224"
                        height="224"
                    ></video>
                ) : null}
                <IonItem>
                    <Input
                        value={this.state.objectName}
                        onChange={(ev) => this.setState({ objectName: ev.target.value })}
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
                        <div className={styles.scroll}>
                            {this.state.images.map((v: any, i) =>
                                <img src={v.toDataURL()} key={i} alt="captured" />
                            )}
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default InputCard;