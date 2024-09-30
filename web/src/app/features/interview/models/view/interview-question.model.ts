import { Feedback } from "../entity/Feeback.entity";
import { IInterviewQuestion } from "../http/IInterviewQuestion";

export class InterviewQuestionViewModel {
  feedbackResponse!: Feedback;
  videoBlob!: string;
  interviewQuestion!: IInterviewQuestion;
  questionId: string = String(Date.now() + Math.ceil(Math.random() * 999999));


  // view 
  interviewRecorded: boolean = false;
  backgroundNoiseLevel: number[] = [];
  multipleFacesDetected: boolean = false;


  constructor(interviewQues: IInterviewQuestion) {
    this.interviewQuestion = interviewQues;
    // this.feedbackResponse = new Feedback({
    //   "audio_transcript": {
    //     "english_probablity": 0.36330515146255493,
    //     "filler_count": 0,
    //     "text": "I use data cleaning for my data cleaning job"
    //   },
    //   "avg_cam_distance": 69.0,
    //   "eye_movements": {
    //     "center": 12,
    //     "left": 22,
    //     "right": 2
    //   },
    //   "facial_expression": {
    //     "summary": {
    //       "bad": 10,
    //       "neutral": 26
    //     }
    //   },
    //   "posture": {
    //     "summary": {
    //       "negative": 36,
    //       "positive": 1
    //     }
    //   },
    //   "qa": {
    //     "result": {
    //       "candidateAnswer": "I use data cleaning for my data cleaning job",
    //       "keypoints": [
    //         {
    //           "keypoint": "Understanding the data",
    //           "keypointMentioned": false,
    //           "keypointMistake": "The candidate did not mention anything about understanding the data.",
    //           "keypointTip": "The candidate should explain the importance of understanding the data and its context before cleaning and preparing it. They should mention how they would examine the data types, distributions, and relationships between variables."
    //         },
    //         {
    //           "keypoint": "Data Cleaning",
    //           "keypointMentioned": true,
    //           "keypointMistake": "The candidate did not provide any specific details about data cleaning techniques or tools.",
    //           "keypointTip": "The candidate should describe specific data cleaning techniques they use, such as handling missing values, outliers, duplicates, and inconsistencies. They should also mention the tools they use for data cleaning."
    //         },
    //         {
    //           "keypoint": "Data Transformation",
    //           "keypointMentioned": false,
    //           "keypointMistake": "The candidate did not mention anything about data transformation.",
    //           "keypointTip": "The candidate should explain how they transform the data to make it suitable for analysis. This could include tasks like feature engineering, scaling, normalization, and encoding categorical variables."
    //         }
    //       ],
    //       "mistakes": "The candidate's answer is very vague and does not provide any specific details about their data cleaning process. They simply stated that they use 'data cleaning' for their 'data cleaning job', which does not demonstrate any understanding of the process.",
    //       "question": "Can you explain the process you use to clean and prepare data for analysis?",
    //       "score": 20,
    //       "tips": "The candidate should provide a detailed explanation of the data cleaning process, including specific steps and techniques. They should also be able to give examples of how they have applied these techniques in the past. For example, they could discuss how they identify and handle missing values, outliers, or inconsistent data formats. They should also mention the tools they use for data cleaning, such as Python libraries like Pandas or R packages like dplyr."
    //     },
    //   },
    //   "video_quality": {
    //     "brightness": 0.6143594594594595,
    //     "brightness_classification": "Good",
    //     "overall_quality": "Good",
    //     "sharpness": 0.6138732980542633,
    //     "sharpness_classification": "Good"
    //   }
    // })
  }

  toggleRecorded() {
    this.interviewRecorded = !this.interviewRecorded
  }

  setPreviewURL(videoBlob: Blob) {
    this.videoBlob = URL.createObjectURL(videoBlob);
  }


  computeBackgroundNoiseLabel(threshold = 0.6) {
    const counts = this.backgroundNoiseLevel.filter(value => value > threshold).length;
    const nosieAbouveThresholdCount = counts / this.backgroundNoiseLevel.length;
    if (nosieAbouveThresholdCount > 0.5) {
      return 'High'
    }
    else {
      return 'Low';
    }
  }
}