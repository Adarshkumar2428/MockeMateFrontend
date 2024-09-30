## Feedback Class Thresholding Documentation

The `Feedback` class is designed to process and analyze various aspects of interview feedback data. This documentation provides a detailed explanation of how each feedback attribute is thresholded and summarized to present meaningful insights.

### Class Overview

The `Feedback` class accepts an object of type `IFeedback` and parses it to extract relevant information. The extracted data includes:

- Audio transcript
- Camera distance
- Eye movements
- Facial expressions
- Posture
- Video quality
- Question and answer
- Voice confidence

### Constructor

The constructor initializes the class attributes from the provided `IFeedback` object.

### Methods and Thresholding

#### Audio Transcript Methods

- **getEnglishProbability**: Returns the English probability from the audio transcript.
- **getFillerCount**: Returns the number of filler words detected.
- **getTranscriptText**: Returns the transcribed text.

#### Camera Distance Methods

- **getAvgCamDistance**: Returns the average camera distance.
- **categorizeCameraDistance**: Categorizes the camera distance as "far" if greater than 100 units, otherwise "near".

#### Eye Movements Methods

- **getEyeMovementsSummary**: Summarizes the eye movements into percentages of center, left, and right movements.
- **getEyeMovementDominance**: Determines the most dominant eye movement direction.
- **getEyeMovements**: Classifies eye movements as 'More' if dominant movement is not center, otherwise 'Normal'.

#### Voice Confidence Methods

- **getVoiceConfidenceSummary**: Summarizes the voice confidence into percentages of calm, confident, and underconfident.
- **getOverallVoiceConfidence**: Calculates the overall voice confidence as a percentage.
- **getDominantVoiceConfidence**: Determines the dominant voice confidence attribute.

#### Facial Expression Methods

- **getFacialExpressionSummary**: Summarizes the facial expressions into percentages of bad, happy, and neutral.
- **getOverallFacialExpression**: Calculates the overall facial expression as a percentage.
- **getDominantFacialExpression**: Determines the dominant facial expression attribute.

#### Posture Methods

- **getPostureSummary**: Summarizes the posture into percentages of positive and negative.
- **getPostureConsistency**: Calculates the posture consistency as a percentage.
- **getDominantPosture**: Determines the dominant posture attribute.

#### Video Quality Methods

- **getVideoQuality**: Returns the video quality attributes including brightness, sharpness, and overall quality.

#### English Quality Method

- **getEnglishQuality**: Categorizes the English probability into quality levels:
  - 0.0 - 0.30: Poor
  - 0.31 - 0.60: Average
  - 0.61 - 0.90: Good
  - 0.91 - 1.0: Excellent

### Example Usage

1. **Audio Transcript Analysis**
   - **English Probability**: Provides the probability of English language usage.
   - **Filler Count**: Indicates the number of filler words used in the transcript.
   - **Transcript Text**: Retrieves the transcribed text of the audio.

2. **Camera Distance Analysis**
   - **Average Camera Distance**: Measures the average distance of the camera.
   - **Categorization**: Classifies the camera distance as "far" if the distance exceeds 100 units, otherwise as "near".

3. **Eye Movements Analysis**
   - **Summary**: Calculates the percentages of eye movements towards the center, left, and right.
   - **Dominance**: Identifies the most dominant direction of eye movement.
   - **Classification**: Classifies eye movements as 'More' if the dominant movement is not center, otherwise 'Normal'.

4. **Voice Confidence Analysis**
   - **Summary**: Summarizes the voice confidence into percentages of calm, confident, and underconfident.
   - **Overall Confidence**: Provides the overall confidence percentage.
   - **Dominant Confidence**: Determines the most dominant confidence attribute.

5. **Facial Expression Analysis**
   - **Summary**: Summarizes facial expressions into percentages of bad, happy, and neutral.
   - **Overall Expression**: Calculates the overall expression percentage.
   - **Dominant Expression**: Determines the most dominant facial expression attribute.

6. **Posture Analysis**
   - **Summary**: Summarizes posture into percentages of positive and negative.
   - **Consistency**: Calculates posture consistency as a percentage.
   - **Dominant Posture**: Identifies the dominant posture attribute.

7. **Video Quality Analysis**
   - **Quality Attributes**: Provides video quality attributes including brightness, sharpness, and overall quality.

8. **English Quality Analysis**
   - **Categorization**: Categorizes English quality based on the English probability.

### Summary

The `Feedback` class provides a comprehensive set of methods to analyze and categorize various aspects of interview feedback. By thresholding the raw data, it allows for a detailed and nuanced understanding of the interviewee's performance.
