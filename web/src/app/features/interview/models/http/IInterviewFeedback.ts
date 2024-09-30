export interface IInterviewFeedback {
  feedback: IFeedback;
  video_uploaded: boolean;
  questionKey: string;
}

export interface IFeedback {
  audio_transcript: IAudioTranscript;
  avg_cam_distance: number;
  eye_movements: IEyeMovements;
  facial_expression: IFacialExpression;
  posture: IPosture;
  video_quality: IVideoQuality;
  voice_confidence: IAudioConfidence
  qa: {
    result: IQuestionAnswer
  }
}

export interface IAudioTranscript {
  english_probablity: number;
  filler_count: number;
  text: string;
}

export interface IEyeMovements {
  center?: number;
  left?: number;
  right?: number;
}

export interface IFacialExpression {
  summary: IFacialExpressionSummary;
}

export interface IFacialExpressionSummary {
  bad?: number;
  happy?: number;
  neutral?: number;
}

export interface IPosture {
  summary: IPostureSummary;
}

export interface IPostureSummary {
  positive?: number;
  negative?: number;
}

export interface IVideoQuality {
  brightness: number;
  brightness_classification: string;
  overall_quality: string;
  sharpness: number;
  sharpness_classification: string;
}

export interface IQuestionAnswer {
  question: string;
  candidateAnswer: string;
  score: number;
  mistakes: Array<{isGrammar: boolean, mistake: string}>;
  tips: string;
  keypoints: Array<IQuestionAnswerKeypoint>;
}

export interface IAudioConfidence {
  "Calm": number,
  "Confident": number,
  "Under confident": number
}

export interface IQuestionAnswerKeypoint {
  keypoint: string;
  keypointMentioned: boolean;
  keypointMistake: string;
  keypointTip: string;
}