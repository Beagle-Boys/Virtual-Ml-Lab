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
    train = async () => {
        ;
    }
    addImage = (image:ImageInputClass) => {
        ;
    }
    /*train = async () => {
        let tensorListx = [];
        let tensorListy = [];
        for (let i = 0; i < this.imageClasses.length; i++) {
            let imageClass = this.imageClasses[i];
            for (let j = 0; j < imageClass.images.length; j++) {
                let img = document.createElement("img");
                let imgSrc = imageClass.images[j].url;
                if (!imgSrc) continue;
                img.src = imgSrc;
                let tsr = tf.browser.fromPixels(img);
                tsr = tf.image.resizeBilinear(tsr, [224, 224]);
                tensorListx.push(tsr);
                tensorListy.push(tf.tensor(imageClass.number));
            }
        }
        let inputTensor = tf.stack(tensorListx);
        console.log(JSON.parse(JSON.stringify(inputTensor)));
        //this.model = tf.sequential()
        this.model.add(tf.layers.conv2d({
            inputShape: [224, 224, 3,],
            kernelSize: 3,
            activation: "relu6",
            filters: 64
        }));
        this.model.add(tf.layers.conv2d({
            kernelSize: 3,
            activation: "relu6",
            filters: 32
        }));
        this.model.add(tf.layers.flatten());
        this.model.add(tf.layers.dense({
            units: 10,
            activation: "softmax"
        }));
        /*this.model.add(tf.layers.flatten({
            inputShape: [6, 244, 244, 3]
        }));
        this.model.add(tf.layers.dense({
            units: 128,
            activation: 'relu'
        }));
        this.model.add(tf.layers.dense({
            units: this.imageClasses.length
        }));
        this.model.compile({
            optimizer: "adam",
            loss: tf.losses.softmaxCrossEntropy,
        });
        this.model.fit(inputTensor, tensorListy, {
            epochs: 50,
        }).then(console.log).catch(console.error);
    }*/
}