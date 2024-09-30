# MockMate
Welcome to **MockMate**, the ultimate AI-based mock interview tool designed to help you ace your next interview! Our tool is crafted to assist users in practicing and refining their interview skills through a comprehensive suite of features. With real-time feedback on various aspects of the interview process, users can improve their performance and increase their chances of success in actual interviews. 

1. About
     - Goals and Objectives
     - Target Audience
1. Project Scope
   - Inscope
    - Must have
    - Good to have  
    - Nice to have
   - Assumptions         
7. System Architecture
1. Installation
2. Deployment
3. Contribution
4. Modules
    - [Voice Confidence](https://github.com/Qbitx6/MockMate/blob/dev/src/core/voice_confidence/README.md)
    - [Camera Distance](https://github.com/Qbitx6/MockMate/blob/dev/src/core/camera_distance/README.md)
    - [Eye Tracking](https://github.com/Qbitx6/MockMate/blob/dev/src/core/eye_tracking/README.md)
    - [Facial Expression](https://github.com/Qbitx6/MockMate/blob/dev/src/core/facial_expression/README.md)
    - [Grammar Analyser](#project-beta)
    - [Pose Presentation](https://github.com/Qbitx6/MockMate/blob/dev/src/core/pose_presentation/README.md)
    - [QA Scorer](https://github.com/Qbitx6/MockMate/blob/dev/src/core/qa_scorer/README.md)
    - [Video Quality](https://github.com/Qbitx6/MockMate/blob/dev/src/core/video_quality/README.md)
    - [Video Transcription](https://github.com/Qbitx6/MockMate/blob/dev/src/core/video_transcription/README.md)

5. [Feedback Integration](https://github.com/Qbitx6/MockMate/blob/dev/src/core/README.md)
7. [Frontend Guides](https://github.com/Qbitx6/MockMate/blob/dev/web/README.md)
9. [Future Enhancements]

## Goals & Objectives
- **Improve Candidate Performance:** Enhance performance in real interviews, leading to higher job placement rates.
- **Greater Efficiency in Talent Acquisition:** Achieve cost savings and resource optimization.
- **Positive Feedback:** Receive testimonials from both candidates and hiring organizations indicating the tool's effectiveness in preparing candidates for success.

## Target Audience
MockMate is specifically designed for the students of TBC, focusing on delivering personalized feedback, analyzing performance, and building confidence. 

#### Comprehensive Question Bank: 
Our tool includes a comprehensive question bank that spans various fields, including:
- Global Business Management
- Artificial Intelligence
- Supply Chain Management
- Cloud Computing
- Cybersecurity

This allows students to prepare for a wide range of job roles. Given the importance of communication skills for TBC students, MockMate also emphasizes enhancing these skills to ensure overall professional development.

## Project Scope
In scope: The AI Mock Interview Tool will be used to analyze candidates’ eye-movement, tone, clarity, and confidence levels. This project covers analysis & design, development and testing of a prototype of a mock interview tool plus full documentation that serves as a proof-of-concept supporting limited functions as listed under High-level Requirements.

### Constraints:
1.	No formal business requirement discovery process is performed.
2.	This project is only a proof-of-concept showing the capabilities of the students to the best supported by the information and data from TBC.
3.	The end product from this project will not be deployable due to cost constraints and lack of complete business & functional requirements from TBC.
5.	This project is constrained by its timeline, functionality will be limited to necessities only at the discretion of the project advisor.


### Project End Product(s) (Define the expected outcome of the project which needs to be tangible and measurable.)
1.	The end product is a prototype as a Proof-of-Concept (POC) of a mock interview tool.
2.	Full documentation including but not limited to technical spec, functional spec, source code and installation scripts & procedures, user instruction in form of a library set.
   
High-Level Requirements (Define the functional and technical requirements to be met to produce project end product.)
1. **User Interface (UI)**: The mock interview tool has a user-friendly interface for candidates to start, pause, and stop mock interviews and a dashboard for displaying post-interview analysis.
2.	**Natural Language Processing (NLP)**: The mock interview tool shows a transcription of candidate responses with advanced NLP and emotion recognition algorithms. It provides analysis of speech content for clarity, relevance, and coherence.
3.	**Post-Interview Analysis**: The mock interview tool shows a report summarizing strengths and areas for improvement and suggestions for enhancing interview performance.

**In-scope features**: The features of this tool is divided into 3 categories, The most priority features are defined as “MUST HAVE”, the features that are good if we add them to the project the features on the second priority after the “MUST HAVE” are labeled as “GOOD TO HAVE” and the features which were difficult to execute under a time constraint are labeled as “NICE TO HAVE” features.

### MUST HAVE:
**Video and Audio Recording**: The mock interview tool can allow users to video record themselves on the platform. Recordings can be viewed, managed, and uploaded as needed.

**Prep time, Recording time, and Flow**:  For each question, the user gets a prep-time of 30 seconds and a recording time of 1 minute within which they can answer. Once the user has completed answering the question, they can mark the recording as done to move on to the next question. Users can only move through the questions sequentially. (Questions will be based on the role they are practicing their interview for. The mock interview tool can support 5-10 different role-based job interviews, as well as a general interview HR round of questions.) Future enhancements

**Face presence, distance to camera**: The mock interview tool detects the user’s face and analyzes their distance. If the user does not have their face centered or is far away/too close to the camera and it will be generated on the report. 

**Eye Contact**: The mock interview tool can analyze how long the user is able to maintain eye contact with the camera and based on the results provide corrective feedback at the end of the interview, as well as the significance of maintaining eye contact.

**Facial Expressions**:  The Facial Expression module is designed to analyze and identify the user's facial expressions within video frames. It provides real-time classification of various facial expressions, helping to gauge the user's emotions and reactions during interactions. 

**Video Background**: The mock interview tool can detect the number of persons in the frame and give you a live report of the number during your interview.

**Audio Background**: The mock interview tool will detect the background noise and give you a live feedback report in the interface.

**Filler Words Detection**: A filler words detection model identifies and counts the usage of filler words (like "um," "uh," and "like") in speech. It employs natural language processing (NLP) techniques to analyze spoken language and detect these non-essential words.

**Audio Transcription**: An audio transcription model converts spoken language in audio into written text using automatic speech recognition (ASR) techniques. It processes audio from the video to generate accurate and readable transcripts of the spoken content. 

**Video quality**: This mock interview will let you know how the quality of the video was during the interview. It will give you report about the Brightness, Sharpness etc.


### GOOD TO HAVE:
**Grammar Check**: A grammar check model evaluates and corrects grammatical errors in text using natural language processing (NLP) techniques. It analyzes sentence structure, syntax, and context to identify and suggest corrections for issues such as punctuation, verb tense, and word usage.We are using Gemini API key to check for grammar of the candidate, it checks for grammatical errors in the answer of the transcript. 

**English Probability**: The mock interview tool gives you a score of how likely you are to speak in English language. This feature was important as the model was giving report on the non-verbal cues even if you speak in different languages. This feature tells you the report is valid or not based on the English Probability feature.We have considered thresholds to calculate the probability of the language.
Github link- *OpenAI whisper calculates the probability of detected language that we used*.

**Facial Expression Analysis**:The Facial Expression module is designed to analyze and identify the user's facial expressions within video frames. It provides real-time classification of various facial expressions, helping to gauge the user's emotions and reactions during interactions.


**Voice Confidence**: Voice confidence analysis assesses the assertiveness and certainty in a speaker’s voice using features like tone, pitch, and volume. It determines how strongly and convincingly the speaker communicates their message.

**Posture Presentation** : A posture detection model analyzes body posture and movements using computer vision techniques. It detects and classifies various postures to provide feedback on body language, ensuring proper alignment and presentation during activities like interviews or speeches.

## NICE TO HAVE:
**Speech Clarity and Coherence**: The mock interview tool can analyze speech clarity and coherence and prompt the user at the end of how clear their speech was, or the speed of their speech, teaching them the significance of a steady pace and clearer speech.
Our Team was not successful in developing this model.It can be noted down as a Future enhancement for MockMate.

**Question Answer Scoring**: The mock interview tool can score the user based on the answer they provide for the technical question provided. The questions are role based technical questions such as “What is deep learning and how is it different from supervised learning?” Q&A scoring model evaluates the quality and relevance of answers in a question-and-answer session. It uses natural language processing (NLP) to analyze the content, coherence, and accuracy of responses, assigning scores based on predefined criteria. Gemini API key is being used to check the answers with the key points that needs to be answered for the specfic question.


### Assumptions:
1.	Too much background noise will skew other results.
2.	Student is not allowed to blur the background.
3.	Students will be able to collect volunteer information.
4.	Gemini key is being used which has a request limit so the system can only handle 30 interview analysis/day, under the free tier
---


# System Architecture

![image](https://github.com/user-attachments/assets/eeef11b6-557b-4267-b4a9-7378aab5119d)



# Installation

**Install Python:** 
Version 3.11

To get started with MockMate, follow these simple steps:

**Clone the Repository:**
```bash
git clone https://github.com/yourusername/mockmate.git
```


**Checkout `dev` branch:**
```bash
pip install -r requirements.txt
```

**Install Requirements:**
```bash
pip install -r requirements.txt
```
## Deployment
**Run Flask Server:**
```bash
flask run
```

## Contributing

Use Issue Tracker Id in your branch name and Create your Branch From Master/Prod

**Branch Prefixes**

- Feature: feature/JIRA_TICKET_ID/feature_name
- Bugfix: bugfix/JIRA_TICKET_ID/bugfix_title

**Example**
```bash
git checkout -b feature/PAN-19/body-pose-estimator
```

**How to write your commit messages**

- Start with your issue Type: feat/bug/chore
- Put your issue Id in the parenthesis and then write your commit message

**Commit Prefixes**

- feat - When commiting a change on a feture
- bug - When commiting a change on a bug
- chore - when commiting on a code that doesn't change the overall working of the tool but optimizes or fixes internal code structure


**Example**
```bash
git commit -m "feat(KAN-19): implemented a body pose estimator model"
```



# User Interface

Mockmate has been built on Angular Tech stack.
Here are some reasons why we  chose Angular over React:

### 1. Opinionated  Structure
Angular provides a more opinionated structure, which can be beneficial for larger projects or teams. It enforces a particular way of doing things, which can lead to consistency in code structure and practices. This can be advantageous in large teams where standardization is crucial.

### 2. Two-Way Data Binding
Angular supports two-way data binding, which automatically synchronizes data between the model and the view. This feature can simplify the development of interactive applications, reducing the boilerplate code required to manage data synchronization manually.

### 3. TypeScript by Default
Angular is built with TypeScript, a statically typed superset of JavaScript. TypeScript provides features like type-checking and autocompletion, which can improve code quality and development productivity. While React can be used with TypeScript, it's not a default choice.

### 4.In-Built Tools and CLI
Angular comes with a powerful Command Line Interface (CLI) that streamlines the development process. The Angular CLI automates tasks like project setup, building, testing, and deployment, making it easier to follow best practices and maintain code quality.

### 5. Mature Ecosystem
As a more mature framework, Angular has a well-established ecosystem of libraries, tools, and third-party integrations. This maturity can be advantageous for long-term projects, providing stability and a wide range of compatible tools.

[UI code](https://github.com/Qbitx6/MockMate/tree/dev/web)

# Cost Comparison : Free vs Paid Services 




| Feature                  | Gemini Free Tier (Flash)          | Gemini Paid Tier (Flash)       | ChatGPT (Paid)               |
|--------------------------|-----------------------------------|-------------------------------|------------------------------|
| **Amount of Interviews** | 30 Interviews Per Day (might vary)| Unlimited Interviews          | Unlimited Interviews         |
| **Budget**               | Free                              | $0.0042 per interview         | $0.06 per interview          |
| **Request Limits**       | 15 Requests / Minute              | 1000 Requests / Minute        | No limit                     |



# Future Enhacements
1. Fine Tuning Required for Vocal Confidence model
2. Developing Speech Clarity and Coherence feature for the interview.
3. Conducting Interviews based on the course field and for different job positions in the course industry.
4. Optimizing the runtime of the feedback integration model.
5. Background Noise model can be enhanced with better precision.
6. English Probability model can be made compatible with different accents providing better accuracy.
7. Build a feature that figures out whether a candidate is reading out the answer or is actually answering , this can be handled well by considering the Speech rate.
8. Fine tuning Audio Background feature.



**Prepare with confidence. Succeed with MockMate.**
