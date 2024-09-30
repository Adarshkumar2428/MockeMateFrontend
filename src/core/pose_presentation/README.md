# Pose Presentation Model

## Overview

The Pose Presentation Model is designed to analyze a person's posture from video frames using MediaPipe for pose landmark detection and a custom Keras model for classification. This model identifies the quality of the presentation based on the detected pose landmarks.

## Problem Statement

In many scenarios, such as video interviews or presentations, posture plays a crucial role in communication. Poor posture can negatively impact the perception of confidence and professionalism. This model aims to provide feedback on the quality of a user's posture to help improve their presentation skills.

## Function Documentation

### `PostureClassifier` Class

#### `__init__(self, mediapipe_landmarker_path, pose_model_weights_path) -> None`
Creates an instance of the PostureClassifier class.

- **Inputs:**
  - `mediapipe_landmarker_path (str)`: Path to the MediaPipe landmarker model.
  - `pose_model_weights_path (str)`: Path to the pose model weights file.
- **Output:**
  - None
- **Function Dependencies:**
  - Requires `mediapipe` and `tensorflow.keras` for model loading.
- **Function Usage:**
  - Initializes the MediaPipe landmarker and the pose classification model with specified paths.

#### `analyse_posture(self, frame_arr: np.array) -> dict`
Analyzes the posture quality from a batch of video frames.

- **Inputs:**
  - `frame_arr (np.array)`: Array of video frames to analyze.
- **Outputs:**
  - `dict`: A dictionary containing:
    - `presentation_quality (list)`: List of presentation quality labels for each frame.
    - `no_pose (int)`: Number of frames where no pose was detected.
- **Function Dependencies:**
  - Uses MediaPipe for pose landmark detection and Keras for classification.
- **Function Usage:**
  - Processes each frame to detect pose landmarks, transforms landmarks into a feature array, and predicts the presentation quality using the pose classification model.

#### `transform_posture_label(self, postureCode: int) -> str`
Transforms the posture code into a human-readable label.

- **Inputs:**
  - `postureCode (int)`: Posture classification code.
- **Outputs:**
  - `str`: Human-readable posture label ("positive" or "negative").
- **Function Dependencies:**
  - None
- **Function Usage:**
  - Converts numerical posture classification codes into string labels.

#### `load_landmark_model(self, mediapipe_landmarker_path: str) -> object`
Loads the MediaPipe landmarker model.

- **Inputs:**
  - `mediapipe_landmarker_path (str)`: Path to the MediaPipe landmarker model.
- **Outputs:**
  - `object`: Loaded MediaPipe landmarker model.
- **Function Dependencies:**
  - Requires `mediapipe`.
- **Function Usage:**
  - Initializes the MediaPipe landmarker model with the specified path.

#### `load_pose_model(self, pose_model_weights_path: str) -> Sequential`
Loads the pose classification model with specified weights.

- **Inputs:**
  - `pose_model_weights_path (str)`: Path to the pose model weights file.
- **Outputs:**
  - `Sequential`: Loaded Keras model.
- **Function Dependencies:**
  - Requires `tensorflow.keras`.
- **Function Usage:**
  - Initializes the Keras model architecture and loads the weights from the specified path.

## Future Enhancements

- **Real-time Pose Analysis**: Implementing real-time pose analysis for live feedback during presentations.
- **Additional Posture Categories**: Expanding the model to classify more detailed posture categories (e.g., slouching, standing, sitting).
