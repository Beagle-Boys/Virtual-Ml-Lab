import { UploadFile } from "antd/lib/upload/interface";
import * as tf from "@tensorflow/tfjs";
import NeuralNetwork from "./NeuralNetwork";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

export default class ImageInputClass {
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
