import * as tf from "@tensorflow/tfjs";
import ImageInputClass from "./ImageInputClass";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";

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
    trained: boolean = false;
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
    net: mobilenet.MobileNet | null = null;
    model: tf.Sequential;
    classifier: knnClassifier.KNNClassifier;
    constructor() {
        this.model = tf.sequential();
        this.app().then((net) => this.net = net).catch(console.error);
        this.classifier = knnClassifier.create();
    }
    app = async () => {
        console.log('Loading mobilenet..');
        // Load the model.
        let net = await mobilenet.load();
        console.log('Successfully loaded model');
        return net;
    }
    train = () => {
        if (this.net === null) return;
        for (let i = 0; i < this.imageClasses.length; i++) {
            let imageClass = this.imageClasses[i];
            for (let j = 0; j < imageClass.images.length; j++) {
                let img = document.createElement("img");
                let imgSrc = imageClass.images[j].url;
                if (!imgSrc) continue;
                img.src = imgSrc;
                let activation = this.net.infer(img, true);
                this.classifier.addExample(activation, imageClass.className);
                this.trained = true;
            }
        }
    }
    predict = () => {
        ;
    }
    addImage = (image: ImageInputClass) => {
        ;
    }
}