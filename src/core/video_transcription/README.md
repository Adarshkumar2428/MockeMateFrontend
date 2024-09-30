# Video Transcription

## Problem Statement

In practice interview settings, candidates need detailed feedback on their spoken responses to improve their performance. To provide this feedback, we need text transcriptions of the videos they record during interviews. These transcriptions enable us to offer actionable feedback on grammar, spelling, content accuracy, and filler word usage.

## Proposed Solution

### Audio Extraction
- **Process**: Utilize multimedia processing tools (e.g., FFmpeg) to extract audio from video files.
- **Objective**: Obtain a clean and clear audio signal from the video content.

### Speech-to-Text Conversion
- **Model Selection**: Choose a suitable speech recognition model. For this purpose, we used the Google Speech-to-Text API.
- **Transcription**: Convert the extracted audio signal into textual transcripts.

## Dataset

For this video-to-text model, we initially downloaded YouTube videos since we were not provided with a dataset. Once our model was working properly, we evaluated it on real data by using recorded interview videos of students. We manually created and recorded these interview videos of students.

## Researched Approach

### First Approach: OpenAI Whisper
Initially, we tried OpenAI Whisper because it has multiple models like Tiny, Base, Small, Medium, and Large. We can use it according to our needs. If we care more about time efficiency than the accuracy of the text, we can go with Tiny, Base, and Small models. On the other hand, if we are concerned about accuracy more than time efficiency, we can go with Medium and Large models.

### Second Approach: IBM Watson
The second option we tried was IBM Watson. It was working properly, but it is a paid service. Since this application is open source, we couldn’t go with this option.

### Final Approach: Google API
We tried the Google API, and it was working properly, just like OpenAI Whisper. However, the Google API was detecting more accurate words, especially for first names. So, we decided to go with the Google API because it was more accurate and time efficient.

**References**:
- [OpenAI Whisper](https://github.com/openai/whisper)
- [IBM Watson](https://cloud.ibm.com/apidocs/speech-to-text)
- [Google Speech-to-Text](https://cloud.google.com/speech-to-text/docs)

---

# Filler Words Detection

## Problem Statement

In interviews, clear and confident communication is very important. Many candidates use too many filler words like "um," "uh," and "like," which can make them seem less confident. Current interview practice tools and evaluators don't have a good way to count and give feedback on these filler words. This deficiency limits candidates' ability to identify and improve their speaking habits, hindering their overall interview performance and confidence.

## Proposed Solution

### Audio Extraction
- **Process**: Utilize multimedia processing tools (e.g., FFmpeg) to extract audio from video files.

### Speech-to-Text Conversion
- **Model Selection**: Choose a suitable speech recognition model. For this purpose, we used the OpenAI Whisper (Tiny) with a specific prompt.

## Researched Approach

### First Approach: Google API/Kaldi
These two options, Google API and Kaldi, do not detect filler words because they are designed to ignore them. Therefore, we cannot consider them.

### Second Approach: IBM Watson
The second option we tried was IBM Watson. It worked properly, but it is a paid service. Since this application is open source, we cannot go with this option.

### Third Approach
In this approach, we recorded samples in three classes (background noise, speech with filler words, and speech without filler words) using Teachable Machine and trained a CNN model. However, we did not achieve the desired accuracy.

### Final Approach: OpenAI Whisper
For filler word detection, we used OpenAI Whisper (Tiny) and gave the prompt: "Do not remove filler words like 'um,' 'ah,' 'huh,' 'and so,' 'so um,' 'uh,' 'and um,' 'yeah,' 'uh so,' 'so uh,' 'yeah so,' 'you know,' 'uh and,' 'and uh'." This approach worked.

## Code Documentation 

#### `__init__(self, model_name="tiny")`

- **Inputs**: 
  - `model_name` (str): The name of the Whisper model to load. Default is "tiny".
  
- **Output**: 
  - None

- **Function Dependencies**: 
  - `whisper.load_model`: Loads the Whisper model.
  - `re`: For regular expression operations.
  - `speech_recognition.Recognizer`: Initializes a speech recognition recognizer.

- **Function Usage**: 
  - Initializes the `VideoTranscripter` class with the specified Whisper model and sets up the filler word list and regular expression for filler word detection.

#### `transcribe_audio(self, audio_path)`

- **Inputs**: 
  - `audio_path` (str): Path to the audio file to be transcribed.

- **Output**: 
  - A dictionary containing:
    - `text` (str): Transcribed text using Google Speech Recognition.
    - `english_probability` (float): Probability that the detected language is English.
    - `filler_count` (int): Count of detected filler words in the transcription.

- **Function Dependencies**: 
  - `whisper.load_audio`: Loads audio from the specified path.
  - `whisper.pad_or_trim`: Pads or trims the audio to fit the model's input requirements.
  - `whisper.log_mel_spectrogram`: Converts the audio to a log-mel spectrogram.
  - `whisper.DecodingOptions`: Sets the decoding options for the Whisper model.
  - `whisper.decode`: Decodes the audio to text using the Whisper model.
  - `speech_recognition.Recognizer`: Recognizes speech using Google Speech Recognition.
  - `re.findall`: Finds all occurrences of filler words in the text.

- **Function Usage**: 
  - Extracts audio from the specified file, converts it to text using the Whisper model and Google Speech Recognition, and counts the number of filler words in the transcription.

#### `word_timestamps(self, segment)`

- **Inputs**: 
  - `segment` (dict): A dictionary containing segment information with start and end times and text.

- **Output**: 
  - A list of dictionaries, each containing:
    - `word` (str): The word in the segment.
    - `start` (float): The start time of the word in the segment.
    - `end` (float): The end time of the word in the segment.

- **Function Dependencies**: 
  - None

- **Function Usage**: 
  - Calculates and returns word-level timestamps for the given segment of text.

#### `print_word_timestamps(self, result)`

- **Inputs**: 
  - `result` (dict): A dictionary containing the transcription result with segments.

- **Output**: 
  - None

- **Function Dependencies**: 
  - `word_timestamps`: Calculates word-level timestamps for each segment.

- **Function Usage**: 
  - Prints word-level timestamps for each word in the transcription result.

#### `test(audio_path)`

- **Inputs**: 
  - `audio_path` (str): Path to the audio file to be tested.

- **Output**: 
  - None

- **Function Dependencies**: 
  - `VideoTranscripter`: Initializes an instance of the `VideoTranscripter` class.
  - `transcribe_audio`: Transcribes the audio file.
  - `print_word_timestamps`: Prints the word-level timestamps for the transcription.

- **Function Usage**: 
  - Tests the transcription process by transcribing the specified audio file and printing word-level timestamps.

---
