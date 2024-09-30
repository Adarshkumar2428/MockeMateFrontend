/// <reference lib="webworker" />
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

let model: cocoSsd.ObjectDetection;


console.log("WORKER INJECTED");

addEventListener('message', async ({ data }) => {
  if (data.type === 'init') {
    model = await cocoSsd.load();
    console.log(model)
    postMessage({ type: 'init', status: 'initialized' });
  } else if (data.type === 'detect' && model) {

    const { tensor, width, height } = data.frame;
    const predTensor = tf.tensor(new Uint8Array(tensor), [width,height, 3]) as tf.Tensor3D;
    const predictions = await model.detect(predTensor);
    predTensor.dispose();
    postMessage({ type: 'predictions', predictions });
  }
});
