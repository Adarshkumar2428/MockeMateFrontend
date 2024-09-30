import mediapipe as mp
import os
import numpy as np

from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout


class PostureClassifier:
  def __init__(self, mediapipe_landmarker_path, pose_model_weights_path):
    if not os.path.exists(mediapipe_landmarker_path):
      raise Exception("Media Pipe Landmark Asset Doesnot Exists") 
    
    if not os.path.exists(pose_model_weights_path):
      raise Exception("Pose Model Weight file Doesnot Exists")
  
  
    self.landmarker = self.load_landmark_model(mediapipe_landmarker_path)
    self.pose_model = self.load_pose_model(pose_model_weights_path)

  
  def analyse_posture(self, frame_arr: np.array):
    
    # get pose
    
    landmarks_batch = []
    no_pose = 0
    
    for frame in frame_arr:    
      mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
      landmark_results = self.landmarker.detect(mp_image)
      
      if not len(landmark_results.pose_landmarks):
        no_pose += 1; 
        continue
      
      person_of_interest = landmark_results.pose_landmarks[0] # TODO: check index error
      landmarks_np = []
      for landmark in person_of_interest:
        landmark_x = landmark.x
        landmark_y = landmark.y
        landmark_z = landmark.z
        landmark_viz = landmark.visibility
        landmark_presence = landmark.presence
              
        landmarks_np.extend([landmark_x, landmark_y, landmark_z, landmark_viz, landmark_presence])
      landmarks_np = np.array(landmarks_np)
      landmarks_batch.append(landmarks_np)
    
    # get preds from pose model
    
    landmarks_batch = np.array(landmarks_batch)
    
    presentation_quality = self.pose_model.predict(landmarks_batch, verbose=False)
    presentation_quality_argmax = presentation_quality.argmax(axis=1).squeeze().tolist()
    presentation_quality_argmax = list(map(self.transform_posture_label, presentation_quality_argmax))
    
    return {
      "presentation_quality": presentation_quality_argmax,
      "no_pose": no_pose
    }
    
  def transform_posture_label(self,postureCode: int):
    if postureCode == 1:
      return "positive"
    else:
      return "negative"
  
  
  def load_landmark_model(self, mediapipe_landmarker_path):
    
    # load mediapipe
    
    BaseOptions = mp.tasks.BaseOptions
    PoseLandmarker = mp.tasks.vision.PoseLandmarker
    PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = PoseLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=mediapipe_landmarker_path),
        running_mode=VisionRunningMode.IMAGE)

    landmarker = PoseLandmarker.create_from_options(options)
    return landmarker
  
  def load_pose_model(self, pose_model_weights_path):
    pose_model = Sequential()
    pose_model.add(
      Dense(
        input_shape=[165],
        units=100,
        activation="relu"
      )
    )
    pose_model.add(Dropout(0.2))
    pose_model.add(Dense(2, activation="softmax"))
    pose_model.compile(optimizer="rmsprop", loss="categorical_crossentropy", metrics=['accuracy'])
    pose_model.load_weights(pose_model_weights_path)  
    return pose_model
  
if __name__ == "__main__":
  pose_model = PostureClassifier(
    pose_model_weights_path="../models/pose_model_0.95.weights.h5",
    mediapipe_landmarker_path="../models/pose_landmarker_lite.task"
  )
  
  posture = pose_model.analyse_posture("../notebooks/test-2.png")
  print(posture)