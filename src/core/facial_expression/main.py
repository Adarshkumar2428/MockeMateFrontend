import os
import numpy as np
import tensorflow as tf
import cv2
import mediapipe as mp
import matplotlib.pyplot as plt

from tensorflow.keras.applications import MobileNetV2 
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras import Model
from pickle import load
from concurrent.futures import ThreadPoolExecutor


class FacialExpressionClassifier:
  
  def __init__(
      self, 
      expression_weights_path,
      face_detection_path,
      expression_decoder_path
    ):
    models = self.load_models(
      expression_decoder_path=expression_decoder_path,
      face_detection_path=face_detection_path,
      expression_model_weights_path=expression_weights_path
    )
    
    self.expression_model = models.get('expression_model')
    self.label_decoder = models.get('label_decoder')
    self.face_detector = models.get('face_detector')
  
  def create_facial_expresion_model(self,input_shape, output_shape):
    inputs = tf.keras.Input(shape=input_shape)
    feature_extractor = MobileNetV2(
        include_top=False,
        weights='imagenet',
        input_shape=(128,128,3)
    )
    extracted_features = feature_extractor(inputs, training=True)
    gap = GlobalAveragePooling2D()(extracted_features)
    fc2 = Dense(output_shape, activation="softmax")(gap)
    
    model = Model(inputs=inputs, outputs=fc2)
    return model


  def write_frame_to_disk(self,face_frame,file_name, write_path):
    if not os.path.exists(write_path):
      raise Exception("Facial Expression: Write Path Doesnot Exists")

    face_crop_path = os.path.join(write_path, file_name); 
    cv2.imwrite(face_crop_path, cv2.cvtColor(face_frame, cv2.COLOR_BGR2RGB))

  def crop_face(self, frame_np: np.array):
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_np)
    face_detector_result = self.face_detector.detect(mp_image).detections
    
    # no faces detected
    if not len(face_detector_result):
      return np.array([])
    
    face_detector_result = face_detector_result[0]  
    bounding_box = face_detector_result.bounding_box
    # crop face 
    face = frame_np[
      bounding_box.origin_y:bounding_box.origin_y+bounding_box.height,
      bounding_box.origin_x:bounding_box.origin_x+bounding_box.width,
    ]
    
    face = cv2.resize(face, dsize=(128, 128), interpolation=cv2.INTER_CUBIC)
    face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    face = np.expand_dims(face, axis=2).repeat(3, axis=2)
    return face


  def predict_facial_expression_batch(self, image_batch: np.array):
    if len(image_batch) == 0:
      raise Exception("[Facial Expression]: image_batch not passed")

    # run crop face on all the images in the batch
    crop_faces = []
    no_faces = 0
    
    with ThreadPoolExecutor() as tp:
      futures = []
      for image in image_batch:
        futures.append(tp.submit(self. crop_face, frame_np=image))

      for future in futures:
        res  = future.result()
        if not len(res) == 0:
          crop_faces.append(res)
        else:
          no_faces += 1
      
      tp.shutdown()
    
    crop_faces = np.array(crop_faces)
    
    # expand dim
    frames_pred = self.expression_model.predict(crop_faces, verbose=False)
    frames_pred = np.round(frames_pred)
    frames_pred_transformed = self.label_decoder.inverse_transform(frames_pred).squeeze().tolist()
    frames_pred_transformed = list(filter(lambda x: x != None, frames_pred_transformed))
    return {"facial_expression":frames_pred_transformed, "no_faces": no_faces}
  
  
  def load_models(
    self,
    expression_model_weights_path, 
    expression_decoder_path,
    face_detection_path
  ):
    
    # setup expression model
    expression_model = self.create_facial_expresion_model(
      input_shape=(128, 128, 3),
      output_shape=3
    )
    
    expression_model.load_weights(expression_model_weights_path)  
    
    # load label decoder
    label_decoder = load(open(expression_decoder_path, "rb"))
    
    # setup media pipe face detector
    BaseOptions = mp.tasks.BaseOptions
    FaceDetector = mp.tasks.vision.FaceDetector
    FaceDetectorOptions = mp.tasks.vision.FaceDetectorOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = FaceDetectorOptions(
      base_options=BaseOptions(
        model_asset_path=face_detection_path
      ),
      running_mode=VisionRunningMode.IMAGE
  )

    face_detector = FaceDetector.create_from_options(options)
    return {
      "expression_model":expression_model, 
      "label_decoder":label_decoder, 
      "face_detector":face_detector
    }
    
if __name__ == "__main__":
  
  FACIAL_EXPRESSION_MODEL_WEIGHTS = "D:/CollegeNotes/AIP/Code/MockMate/src/core/facial_expression/models/facial_expr_mobilenet_weights.weights.h5",
  FACIAL_EXPRESSION_DECODER="D:/CollegeNotes/AIP/Code/MockMate/src/core/facial_expression/models/facial_expr_label_encoder.pkl",
  MOBILE_NET_TASK_TFLITE="D:/CollegeNotes/AIP/Code/MockMate/src/core/facial_expression/models/blaze_face_short_range.tflite"
  
  model = FacialExpressionClassifier(
    expression_weights_path=FACIAL_EXPRESSION_MODEL_WEIGHTS,
    expression_decoder_path=FACIAL_EXPRESSION_DECODER,
    face_detection_path=MOBILE_NET_TASK_TFLITE
  )
  
  facial_expressions_face = model.predict_facial_expression(frame_path="./notebooks/test_frame.png")
  print(facial_expressions_face)