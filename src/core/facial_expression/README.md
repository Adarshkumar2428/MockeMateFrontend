## Facial Expression Model

### Problem Statement
In the context of online interviews, non-verbal communication plays a crucial role in conveying confidence, engagement, and professionalism. Facial expressions, being a significant component of non-verbal cues, can greatly influence the perception of an interviewee. Our interview tool aims to provide comprehensive feedback on various aspects of the interview, including the analysis of facial expressions. This feature helps candidates understand and improve their non-verbal communication, ultimately enhancing their overall performance in interviews.

### Dataset
For the facial expression recognition model, we utilized a well-known dataset, the FER-2013 dataset, which contains 35,887 grayscale, 48x48 pixel images of faces, each labeled with one of seven emotions: anger, disgust, fear, happiness, sadness, surprise, and neutral. This dataset is widely used in facial expression recognition research and provides a robust foundation for training our model.

### Model Architecture
To achieve accurate facial expression recognition, we implemented a two-step model architecture involving face cropping and fine-tuning a pre-trained neural network:

1. **Face Cropping with MediaPipe**
   - **MediaPipe** is an open-source cross-platform framework that provides customizable and performant machine learning solutions for live and streaming media. We employed MediaPipe's face detection module to accurately crop and extract the face region from each frame of the video.
   - This preprocessing step ensures that the model focuses solely on the relevant facial features, eliminating any background noise and improving the accuracy of the predictions.

2. **Predictions Using and Fine-Tuning with MobileNet-v2**
   - **MobileNet-v2** is a lightweight convolutional neural network architecture designed for efficient on-device image classification. It is particularly well-suited for applications requiring real-time processing, such as our interview tool.
   - We leveraged a pre-trained MobileNet-v2 model and fine-tuned it on the FER-2013 dataset to adapt it specifically for facial expression recognition. Fine-tuning involved training the model on our dataset for several epochs, adjusting the weights to optimize performance for our specific task.
   - This approach allows us to benefit from the pre-trained model's generalization capabilities while tailoring it to the nuances of facial expression recognition in interview scenarios.


**Fine Tuning Notebook**: [mobilenet-facial-expression.ipynb](https://github.com/Qbitx6/MockMate/blob/doc(MIT-83)-facial-expression-documentation-intial/src/core/facial_expression/notebooks/mobilenet-facial-expression.ipynb)

## Model Metrics

**Accuracy**: 0.774

**Confusion Matrix**

![download](https://github.com/user-attachments/assets/0c6d2f11-7f1a-4767-a4db-0192925063d0)

## Code Documentation

#### `__init__(self, expression_weights_path: str, face_detection_path: str, expression_decoder_path: str) -> None`
Initializes the `FacialExpressionClassifier` class.

**Inputs:**
- `expression_weights_path` (str): Path to the expression model weights.
- `face_detection_path` (str): Path to the face detection model.
- `expression_decoder_path` (str): Path to the label decoder.

**Output:** None.

**Function Dependencies:** Calls `load_models` to load necessary models and decoders.

**Function Usage:** Initializes the class with necessary models and decoders for facial expression classification.

---

#### `create_facial_expresion_model(self, input_shape: tuple, output_shape: int) -> tf.keras.Model`
Creates and returns a facial expression classification model using MobileNetV2.

**Inputs:**
- `input_shape` (tuple): Shape of the input tensor.
- `output_shape` (int): Number of output classes.

**Output:** A compiled Keras model.

**Function Dependencies:** Uses TensorFlow and Keras for model creation.

**Function Usage:** Initializes the MobileNetV2 model, adds a global average pooling layer, and a dense output layer for classification.

---

#### `write_frame_to_disk(self, face_frame: np.array, file_name: str, write_path: str) -> None`
Writes a frame to disk.

**Inputs:**
- `face_frame` (np.array): The face frame to write.
- `file_name` (str): Name of the file.
- `write_path` (str): Directory path where the file will be written.

**Output:** None.

**Function Dependencies:** Uses `os` and `cv2` for file operations and image writing.

**Function Usage:** Saves the cropped face frame as an image file in the specified directory.

---

#### `crop_face(self, frame_np: np.array) -> np.array`
Crops the face from a given frame.

**Inputs:**
- `frame_np` (np.array): The frame from which the face needs to be cropped.

**Output:** Cropped face image as an `np.array`.

**Function Dependencies:** Uses MediaPipe for face detection, `cv2` for image processing.

**Function Usage:** Detects and crops the face from the provided frame, resizes, and formats it for the model.

---

#### `predict_facial_expression_batch(self, image_batch: np.array) -> dict`
Predicts facial expressions for a batch of images.

**Inputs:**
- `image_batch` (np.array): Batch of images for which facial expressions need to be predicted.

**Output:** A dictionary containing the facial expressions and the count of frames with no detected faces.

**Function Dependencies:** Uses `ThreadPoolExecutor` for parallel processing, TensorFlow for model predictions.

**Function Usage:** Crops faces from the batch of images and predicts their expressions using the loaded model.

---

#### `load_models(self, expression_model_weights_path: str, expression_decoder_path: str, face_detection_path: str) -> dict`
Loads the expression model, label decoder, and face detection model.

**Inputs:**
- `expression_model_weights_path` (str): Path to the expression model weights.
- `expression_decoder_path` (str): Path to the label decoder.
- `face_detection_path` (str): Path to the face detection model.

**Output:** A dictionary containing the loaded models and decoders.

**Function Dependencies:** Uses TensorFlow, Keras, and MediaPipe for model loading and configuration.

**Function Usage:** Initializes and returns the required models and decoders for facial expression classification.
