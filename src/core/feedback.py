import os
import cv2
import numpy as np

from time import time
from src.core.facial_expression.main import FacialExpressionClassifier
from src.core.video_transcription.main import VideoTranscripter
from src.core.eye_tracking.main import GazeDetectionModel
from src.core.pose_presentation.main import PostureClassifier
from src.core.video_quality.main import VideoQuality
from src.core.camera_distance.main import DistanceEstimator
from src.core.qa_scorer.main import QAScorer
from src.core.voice_confidence.main import VoiceConfidenceModel


from src.utils.utils import chop_video, time_execution
from collections import Counter

class FeedbackSystem:
  def __init__(self):
    
    current_dir = os.path.dirname(os.path.abspath(__file__))

    expression_decoder_path = os.path.join(current_dir, 'facial_expression/models/facial_expr_label_encoder.pkl')
    expression_weights_path = os.path.join(current_dir, 'facial_expression/models/facial_expr_mobilenet_weights.weights.h5')
    face_detection_path = os.path.join(current_dir, 'facial_expression/models/blaze_face_short_range.tflite')
    
    voice_confidence_weights = os.path.join(current_dir, 'voice_confidence/models/CNN_model_weights.weights.h5')
    voice_confidence_encoder = os.path.join(current_dir, 'voice_confidence/models/encoder2.pickle')
    voice_confidence_scaler = os.path.join(current_dir, 'voice_confidence/models/scaler2.pickle')
    voice_confidence_model_json = os.path.join(current_dir, 'voice_confidence/models/CNN_model.json')
    
    
    self.voice_confidence_model = VoiceConfidenceModel(
      model_weights=voice_confidence_weights,
      model_encoder=voice_confidence_encoder,
      model_scaler=voice_confidence_scaler,
      model_json=voice_confidence_model_json
    )
    
    self.facial_expr_classifier = FacialExpressionClassifier(
      expression_decoder_path=expression_decoder_path,
      expression_weights_path=expression_weights_path,
      face_detection_path=face_detection_path
    )

    mediapipe_landmarker_path = os.path.join(current_dir, 'pose_presentation/models/pose_landmarker_lite.task')
    pose_model_weights = os.path.join(current_dir, 'pose_presentation/models/pose_model_0.95.weights.h5')

    self.posture_classifier = PostureClassifier(
      mediapipe_landmarker_path=mediapipe_landmarker_path,
      pose_model_weights_path=pose_model_weights
    )
    
    self.video_transcripter = VideoTranscripter()
    self.eye_tracker = GazeDetectionModel()
    self.video_quality_model = VideoQuality()
    self.distance_estimator = DistanceEstimator()
    self.qa_scorer = QAScorer()
    
  def prepare_images(self, frame_dir: str) -> np.array:
    image_arr = []
    for image in os.listdir(frame_dir):
      if (
        image.endswith(".jpg") or 
        image.endswith(".jpeg") or 
        image.endswith(".png")
      ):
        
        image_path = os.path.join(frame_dir, image)
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image_arr.append(image)

    image_arr = np.array(image_arr)
    return image_arr

  @time_execution  
  def get_feedback(self, video_path: str, qa_context):
    if not os.path.exists(video_path):
      raise Exception("[Feedback System]: Video Path does not exists")
    # step-1: chop video
    
    timestamp = int(time())
    video_frame_path = chop_video(video_path, f"./frames/{timestamp}/") # TODO: fix this path
    video_frames = self.prepare_images(video_frame_path)  # color images
    audio_path = os.path.join(video_frame_path, "output.wav")
    
    # get audio transcript
    audio_transcript = self.video_transcripter.transcribe_audio(audio_path)
    qa_context['answer'] = audio_transcript['text'] # use transcript as your answer
    
    
    eye_tracker_mode = Counter()
    cam_distance_arr =  []

    facial_expression = self.facial_expr_classifier.predict_facial_expression_batch(video_frames)
    facial_expression_mode = Counter(facial_expression['facial_expression'])

    posture_classifier_op = self.posture_classifier.analyse_posture(video_frames)
    posture_classifier_mode = Counter(posture_classifier_op['presentation_quality'])
    
    for frame in video_frames:
    
      eye_track_op = self.eye_tracker.start_prediction(frame)
      eye_position = eye_track_op.get('position')
      
      if eye_position:
        eye_tracker_mode[eye_track_op.get('position')] +=1
      
      cam_distance = self.distance_estimator.process_image(frame)
      cam_distance_arr.append(cam_distance['distance_to_camera'])

    cam_distance_mean = np.array(cam_distance_arr).mean()
    
    # check video quality stats
    
    video_quality = self.video_quality_model.calculate(video_frames)
    voice_confidence = Counter(self.voice_confidence_model.process_audio_file(audio_path))
    
    
    return {
      "video_quality": video_quality,
      "avg_cam_distance": cam_distance_mean,
      "facial_expression": {
        "summary": dict(facial_expression_mode),
        "multiple_person_detected": facial_expression['facial_expression']
      },
      "eye_movements": dict(eye_tracker_mode),
      "posture": {
        "summary":dict(posture_classifier_mode),
      },
      "audio_transcript": audio_transcript,
      "voice_confidence": voice_confidence,
      "qa": self.qa_scorer.get_result(qa_context)
    }