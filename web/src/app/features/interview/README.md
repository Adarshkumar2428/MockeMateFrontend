## Interview Component

This component handles the core UI for recording, uploading and displaying interview feedback.

### Core Modules
![image](https://github.com/user-attachments/assets/d3423431-4615-45a3-9b22-6db511a4600f)

Below is a detailed flowchart explaining how the `InterviewComponent` works:

### Flowchart

![image](https://github.com/user-attachments/assets/ea1c5236-dfa8-426d-a039-9e3683cc09e3)


1. **Initialization Phase**
   - **ngOnInit**
     - Load TensorFlow.js.
     - Create the speech recognition model.
     - Fetch interview questions from the `QuestionService`.
     - Initialize `interviewQues` with fetched questions.

2. **User Interface Initialization**
   - **HTML Rendering**
     - Check if `interviewQuesData` is not empty.
     - Display the interview recorder and preparation timer.
     - Display navigation, progress stepper, and feedback HUD.
     - Display question, key points, and control buttons (Record, Stop, Upload).

3. **Preparation Phase**
   - **Preparation Timer**
     - Display preparation message.
     - When preparation starts, initialize the camera stream.
     - Start detecting background noise.
   - **Preparation Complete**
     - Start recording video.
     - Start the interview timer.

4. **Recording Phase**
   - **Recording Video**
     - Start recording video via `InterviewRecorderComponent`.
     - Display the timer countdown.
     - Update background noise and person count indicators.
     - Stop recording when the timer ends or when the user clicks "Stop".

5. **Post-Recording Phase**
   - **Handle Video Recorded**
     - Save the recorded video.
     - Create FormData with video and question details.
     - Upload video to the server and receive feedback.
     - Update the feedback for the current question.
     - Move to the next question and reset states.

6. **Navigation and State Management**
   - **Handle Question Change**
     - Update the active question index.
     - Load the corresponding video if available, or reset the recorder.
   - **Reset States**
     - Reset background noise levels, timer, person count, and interview state.
     - Stop listening for background noise.
     - Unsubscribe from the timer.

7. **User Actions**
   - **Record Button**
     - Start preparation timer if interview is not started.
   - **Stop Button**
     - Stop recording.
   - **Upload Button**
     - Trigger file upload input.
   - **File Upload**
     - Handle file upload event and process the uploaded video.

### Detailed Breakdown

#### HTML Elements and Their Purpose

1. **Main Container**
   - **Conditionally display based on `interviewQuesData`**: If questions are available, show the main interview interface; otherwise, show a loading message.

2. **`app-interview-recorder` Component**
   - Handles video recording and object detection.
   - Triggers object detection and video recorded events.

3. **`app-prep-timer` Component**
   - Displays preparation message and handles preparation countdown.
   - Emits events when preparation is complete or started.

4. **Navigation and Progress**
   - **Navbar**: Displays the application name.
   - **Progress Stepper**: Shows the progress of the interview questions.
   - **Background Analysis**: Displays background noise levels and person detection count.
   - **Question Card**: Shows the current question, key points, and control buttons (Record, Stop, Upload).
   - **Clock**: Displays the interview timer.
   - **`app-interview-response-hud` Component**: Displays feedback for the current question.

#### Component Logic

1. **Initialization (`ngOnInit`)**
   - Load TensorFlow.js and create the speech recognition model.
   - Fetch interview questions and update `interviewQues`.

2. **Preparation and Recording**
   - Start preparation timer and initialize camera stream.
   - Detect background noise and update noise levels.
   - Start recording video and countdown timer.
   - Handle video recorded event and upload video to the server.

3. **Navigation and State Management**
   - Update active question index and load corresponding video.
   - Reset states after each question.

4. **User Interactions**
   - Start preparation timer, stop recording, and handle file upload.

By following this flowchart, you can understand the detailed working of the `InterviewComponent` and its interaction with various sub-components and services.
