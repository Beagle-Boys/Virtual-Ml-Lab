import * as tf from "@tensorflow/tfjs";
import ImageInputClass from "./ImageInputClass";
import { Tensor } from "@tensorflow/tfjs";

export interface CompileOptions {
    optimizer: string;
    loss: string;
    metrics: string[];
}

export interface LayerOptions {
    numOfLayers?: number;
    units: number;
    batchSize: number;
    activation: string;
}

export interface ModelFitOptions {
    epochs: number;
    batchSize: number;
}

export default class NeuralNetwork {
    compileOptions: CompileOptions = {
        optimizer: "adam",
        loss: "meanSquaredError",
        metrics: ["accuracy"],
    };
    epochs: number = 50;
    imageClasses: ImageInputClass[] = [];
    layerOptions: LayerOptions = {
        units: 10,
        activation: "sigmoid",
        batchSize: 16,
    };
    modelfitOptions: ModelFitOptions = {
        epochs: 50,
        batchSize: 16
    };
    model: tf.Sequential;
    constructor() {
        this.model = tf.sequential();
    }
    train = async () => {
        this.model.add(tf.layers.dense({
            inputShape: [500],
            units: this.layerOptions.units
        }));
        this.model.add(tf.layers.dense({ ...this.layerOptions }));
        this.model.add(tf.layers.dense({ ...this.layerOptions }));
        this.model.add(tf.layers.dense({ ...this.layerOptions, units: this.imageClasses.length }));
        this.model.compile({ ...this.compileOptions, loss:"meanSquaredError" });
        let tensorListx = [];
        let tensorListy = [];
        for (let i = 0; i < this.imageClasses.length; i++) {
            let imageClass = this.imageClasses[i];
            let tensor: { [className: string]: Tensor } = {};
            for (let j = 0; j < imageClass.images.length; j++) {
                let img = document.createElement("img");
                let imgSrc = imageClass.images[j].url;
                if (!imgSrc) continue;
                img.src = imgSrc;
                tensor[imageClass.className] = tf.browser.fromPixels(img);
                tensorListx.push(tensor[imageClass.className]);
                tensorListy.push(tf.tensor(imageClass.className));
            }
        }
        this.model.fit(tensorListx, tensorListy, this.modelfitOptions).then(console.log).catch(console.error);
    }
}