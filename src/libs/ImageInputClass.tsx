import { UploadFile } from "antd/lib/upload/interface";
import * as tf from "@tensorflow/tfjs";
import NeuralNetwork from "./NeuralNetwork";

export default class ImageInputClass {
  className: string = "Class 0";
  number: number = 0;
  disabled: boolean = false;
  images: UploadFile[] = [];
  rendered: boolean = false;
  webcam:any = null;
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
    let img = await this.webcam.capture();
    let activation = neuralNetwork.net?.infer(img, true);
    img.dispose();
    if (!activation) return;
    neuralNetwork.classifier.addExample(activation, this.className);
  };
}
