# Voice Confidence

The Voice Confidence analyzes the speaker's tone and vocal characteristics to assess their level of confidence during speech. It provides insights into the speaker's emotional state and delivery style, helping to enhance communication effectiveness.

## Problem Statement

In a virtual interview setting, understanding the emotional state of candidates is crucial for providing comprehensive feedback and improving the overall interview experience. However, traditional methods of assessing candidate emotions are subjective and inconsistent.

## Data Ingestion

The datasets which are taken from Kaggle are:
- Ryerson Audio-Visual Database of Emotional Speech and Song (Ravdess)
- Surrey Audio-Visual Expressed Emotion (Savee)
- Toronto emotional speech set (Tess)
- Crowd-sourced Emotional Mutimodal Actors Dataset (Crema-D)

All the datasets are merged and created a final dataset which is also shown in the data preparation notebook.

## Data Transformation

Data augmentation was implemented to introduce variance into the dataset and address the overfitting issue. Noise with a value of 0.005 was added to the audio, followed by stretching with a rate of 1.0, shifting between -5 and 5, and pitching with a factor of 0.7. Additionally, features were extracted using Zero-Crossing Rate (ZCR), Root Mean Square Energy (RMSE), and Mel-Frequency Cepstral Coefficients (MFCC). The parameters used for feature extraction included a frame_length of 2048, a hop_length of 512, a sample_rate of 22050, and n_mfcc of 13. These transformations were applied to audio clips of 2.5 seconds in length, considering the maximum audio length was 4 seconds and the average length was 3 seconds. Labels were encoded using one-hot vectors, and the resulting arrays were scaled with a standard scaler to ensure consistency across the dataset.

## Model Training

The model was built using the TensorFlow framework and trained with numpy data on Kaggle's C100 GPU. The architecture consisted of 5 Conv1D layers, each followed by BatchNormalization and MaxPool1D layers. Finally, a single Flatten layer was used to prepare the data for the dense layers. This configuration allowed the model to effectively learn and generalize from the augmented and transformed audio dataset.

## Model Validation

**Accuracy:** 97%

### Accuracy versus Epochs

![image](https://github.com/user-attachments/assets/c237f93e-01e7-4ab3-873f-c220a29928a8)


**Confusion Matrix**

![image](https://github.com/user-attachments/assets/97432f5e-b4d4-400e-acbf-3f036d0f8fa3)


**Metrics**

![image](https://github.com/user-attachments/assets/efda39de-bc8f-4f70-abf8-a4eddbec9e59)

## Research
**First Approach:**  </br>
    In order to make the data  more generalized, I augmented it, when tested in Audio the noise 0.035 was quite good with all the other stretches, shifts, and pitches.</br>
    ZCR is used because it helps to classify the nature of a sound since different genres of sound have distinct ZCR patterns.</br>
    MFCC is used to retrieve information from the sound and to analyze and categorize sound by type, and mood. </br>
    RMSE measures  the power of the signal and also provides a measure of the signal's amplitude variation over time, helping in the analysis of the dynamic range of sound. </br>
    • Data Transformation: Applied noise (0.035), stretch, shift, and pitch adjustments. Used Zero-Crossing Rate (ZCR), Mel-Frequency Cepstral Coefficients (MFCC), and Root Mean Square Energy (RMSE).  </br>
    • Audio Details: Sample rate and number of frames set to 22050, resulting in a 1-second duration.  </br>
    • Model: For the model training,  audio has been loaded in Mono format because we wanted to create uniformity also Feature extraction from mono audio is straightforward, making processing and model training more consistent., that is why  1D CNN with 4 CNN layers and MaxPooling1D between layers, followed by 2 ANN layers.  </br>
    • Results: Achieved 72% training accuracy and 60% validation accuracy, indicating overfitting.  </br>
    
**Second Approach:**  </br>
Since Pytorch has huge resources and is more compatible with Cuda in my system I used Torch.</br>
    • Balancing Dataset: Used the augmentations package from PyTorch, with noise (0.035), stretch, shift, and pitch adjustments. Applied resampling, right padding, mix, and cut to ensure uniform audio length. </br>
        The balanced data of uniform length will help in getting balanced data which was obtained from melspectogram image where Mono audio is converted into 2D image </br>
        Since this was one of the common practices followed, I chose this approach.</br>
    • Feature Extraction: Used only Mel-spectrogram with 64 mel bins, 48000 sample rate, and 48000 samples (1-second duration). </br>
         Mel bins (64) determine the resolution of the frequency axis in the Mel-spectrogram. More Mel bins mean higher resolution and more detailed frequency representation.</br>
         64 Mel bins provide a balance between computational efficiency and capturing sufficient detail in the frequency domain.</br>
         48 kHz is commonly used in professional audio settings, offering high-fidelity audio that can capture a wide range of frequencies and better time resolution </br>
    • Model: Trained a model with 4 Conv2D layers  with max pooling and ReLU activation, followed by a single ANN layer.  </br>    
    • Results: Obtained a loss of 1.96.  </br>
    
**Third Approach:** </br>
Since the audio data is sequence data I tried with LSTM layers.
    • Model: Tested with 2 LSTM layers and 1 LSTM layer.  </br>
    • Results: Achieved 52% training accuracy and 28% validation accuracy in the 5th epoch for the 2 LSTM layer model; the single LSTM layer model performed worse.  </br>
    
**Fourth Approach:**</br>
There is a chance of a vanishing gradient problem with LSTM and to make the model more generalized added a Residual connection that can learn identity and improve accuracy.</br>
To capture data Sample rate is changed to 16000 which is often used for speech and voice recordings, where most of the important frequencies fall below 8 kHz. It provides a good balance between audio quality and file size for applications like speech recognition</br>
    • Model Generalization: Added residual connections to the model. </br>
    • Audio Details: Reduced sample rate to 16000, resulting in a 3-second duration. </br>
    • Results: Achieved 45% training accuracy and 36% testing accuracy. </br>
    
**Fifth Approach:**  </br>
To  weigh different parts of the input sequence differently, capturing long-range dependencies and relationships within the data. Also to focus on relevant features by assigning varying levels of attention to different parts of the input.</br>
    • Model Enhancements: Added self-attention mechanisms on top of residual connections. </br>
    • Training Time: Training took around 8 hours. </br>
    • Results: Accuracy improved slowly, but results were unsatisfactory. </br>
**Final Approach:**  </br>
  The main reason for changing noise from 0.035 to 0.005 because during testing despite the accuracy it failed to predict between angry and disgust, happy and surprise. </br>
  A frame length of 2048 means that each frame or segment of audio data is 2048 samples long. This is used in various audio feature extraction processes such as computing the Mel-spectrogram. 
  </br>
   A hop length (stride) affects the temporal resolution of the analysis. A smaller hop length results in more frames and better temporal resolution but increases the computational load. A hop length of 512 samples is often used to balance between temporal resolution and computational efficiency. </br>
   A sample rate of 22050 Hz means that 22,050 samples are taken every second. This sample rate is often used in various audio applications, including speech processing and music analysis.</br>
  By setting n_mfcc=13,  the feature extraction function  returns 13 MFCC coefficients for each frame of the audio signal. These coefficients are used to represent the audio signal in a lower-dimensional space compared to the raw waveform also can be seen as dimensionality reduction. </br>
    • Simplified Model: Reverted to the initial CNN and single ANN layer model.  </br>
    • Adjustments: Reduced noise to 0.005 and set the learning rate to 0.00001. </br>

## Code Explanation

### `__init__()` Method
- **Inputs:** None.
- **Output:** None.
- **Function Dependencies:** Loads model architecture and weights, initializes emotion mapping.
- **Function Usage:** Sets up the Voice_confidence class.

### `load_pickle_file()` Method
- **Inputs:**
  - `pickle_path` (str)
- **Output:** The loaded pickle object.
- **Function Dependencies:** Uses pickle module.
- **Function Usage:** Loads scaler or encoder from a pickle file.

### `zcr()` Method
- **Inputs:**
  - `data` (numpy.ndarray)
  - `frame_length` (int)
  - `hop_length` (int)
- **Output:**
  - `zcr` (numpy.ndarray)
- **Function Dependencies:** Uses librosa library.
- **Function Usage:** Extracts ZCR feature from audio data.

### `rmse()` Method
- **Inputs:**
  - `data` (numpy.ndarray)
  - `frame_length` (int, optional)
  - `hop_length` (int, optional)
- **Output:**
  - `rmse` (numpy.ndarray)
- **Function Dependencies:** Uses librosa library.
- **Function Usage:** Extracts RMSE feature from audio data.

### `mfcc()` Method
- **Inputs:**
  - `data` (numpy.ndarray)
  - `sr` (int)
  - `frame_length` (int, optional)
  - `hop_length` (int, optional)
  - `flatten` (bool, optional)
- **Output:**
  - `mfcc` (numpy.ndarray)
- **Function Dependencies:** Uses librosa library.
- **Function Usage:** Extracts MFCC feature from audio data.

### `extract_features()` Method
- **Inputs:**
  - `data` (numpy.ndarray)
  - `sr` (int, optional)
  - `frame_length` (int, optional)
  - `hop_length` (int, optional)
- **Output:**
  - `combined_features` (numpy.ndarray)
- **Function Dependencies:** Calls zcr, rmse, and mfcc.
- **Function Usage:** Extracts and combines features from audio data.

### `get_predict_feat()` Method
- **Inputs:**
  - `data` (numpy.ndarray)
- **Output:**
  - `scaled_features` (numpy.ndarray)
- **Function Dependencies:** Calls extract_features and load_pickle_file.
- **Function Usage:** Prepares features by scaling them.

### `prediction()` Method
- **Inputs:**
  - `data` (numpy.ndarray)
- **Output:**
  - `original_emotion` (str)
- **Function Dependencies:** Calls et_predict_feat and load_pickle_file.
- **Function Usage:** Makes a prediction and maps it to a confidence level.

### `process_audio_file()` Method
- **Inputs:**
  - `audio_file` (str)
  - `clip_duration` (float, optional)
- **Output:**
  - `predictions` (list)
- **Function Dependencies:** Uses librosa and calls prediction.
- **Function Usage:** Processes, segments, and makes predictions on an audio file.
