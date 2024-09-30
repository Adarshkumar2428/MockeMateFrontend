import { IAudioConfidence, IAudioTranscript, IEyeMovements, IFacialExpression, IFeedback, IPosture, IPostureSummary, IQuestionAnswer, IVideoQuality } from "../http/IInterviewFeedback";

export class Feedback {
  audioTranscript: IAudioTranscript;
  avgCamDistance: number;
  eyeMovements: IEyeMovements;
  facialExpression: IFacialExpression;
  posture: IPosture;
  videoQuality: IVideoQuality;
  qa: IQuestionAnswer;
  voiceConfidence: IAudioConfidence

  constructor(json: IFeedback) {
    this.audioTranscript = json.audio_transcript;
    this.avgCamDistance = json.avg_cam_distance;
    this.eyeMovements = json.eye_movements;
    this.facialExpression = json.facial_expression;
    this.posture = json.posture;
    this.videoQuality = json.video_quality;
    this.qa = json.qa.result;
    this.voiceConfidence = json.voice_confidence
  }

  getEnglishProbability() {
    return this.audioTranscript.english_probablity;
  }

  getFillerCount() {
    return this.audioTranscript.filler_count;
  }

  getTranscriptText() {
    return this.audioTranscript.text;
  }

  getAvgCamDistance() {
    return this.avgCamDistance;
  }

  getEyeMovementsSummary() {
    return {
      center: this.eyeMovements.center || 0,
      left: this.eyeMovements.left || 0,
      right: this.eyeMovements.right || 0,
    };
  }

  getVoiceConfidenceSummary() {
    return {
      calm: this.voiceConfidence['Calm'] || 0,
      confident: this.voiceConfidence['Confident'] || 0,
      underConfident: this.voiceConfidence['Under confident'] || 0,

    }
  }

  getFacialExpressionSummary() {
    return {
      bad: this.facialExpression.summary.bad || 0,
      happy: this.facialExpression.summary.happy || 0,
      neutral: this.facialExpression.summary.neutral || 0,
    };
  }

  getPostureSummary() {
    return {
      positive: this.posture.summary.positive || 0,
      negative: this.posture.summary.negative || 0,
    };
  }

  getVideoQuality() {
    return {
      brightness: this.videoQuality.brightness,
      brightnessClassification: this.videoQuality.brightness_classification,
      overallQuality: this.videoQuality.overall_quality,
      sharpness: this.videoQuality.sharpness,
      sharpnessClassification: this.videoQuality.sharpness_classification,
    };
  }

  getOverallFacialExpression() {
    const summary = this.getFacialExpressionSummary();
    const total = summary.bad + summary.happy + summary.neutral;
    return {
      badPercentage: (summary.bad / total) * 100 || 0,
      happyPercentage: (summary.happy / total) * 100 || 0,
      neutralPercentage: (summary.neutral / total) * 100 || 0,
    };
  }


  getOverallVoiceConfidence() {
    const summary = this.getVoiceConfidenceSummary();
    const total = summary.calm + summary.confident + summary.underConfident;
    return {
      confidentPercentage: ((summary.confident / total) * 100) || 0,
      calmPercentage: ((summary.calm / total) * 100) || 0,
      underConfidentPercentage: ((summary.underConfident / total) * 100) || 0
    }
  }

  getDominantFacialExpression() {
    const overallExpression = this.getOverallFacialExpression();
    const maxExpression = Math.max(
      overallExpression.badPercentage,
      overallExpression.happyPercentage,
      overallExpression.neutralPercentage
    );
    let dominantExpression = "Neutral";
    if (maxExpression === overallExpression.badPercentage) {
      dominantExpression = "Under Confident";
    } else if (maxExpression === overallExpression.happyPercentage) {
      dominantExpression = "Confident";
    }

    return {
      dominantExpression,
      confidence: maxExpression,
    };
  }


  getDominantVoiceConfidence() {
    const overallExpression = this.getOverallVoiceConfidence();
    const maxExpression = Math.max(
      overallExpression.calmPercentage,
      overallExpression.confidentPercentage,
      overallExpression.underConfidentPercentage
    );
    let dominantExpression = "Calm";
    if (maxExpression === overallExpression.underConfidentPercentage) {
      dominantExpression = "Under Confident";
    } else if (maxExpression === overallExpression.confidentPercentage) {
      dominantExpression = "Confident";
    }

    return {
      dominantExpression,
      confidence: maxExpression,
    };
  }


  getEyeMovementDominance() {
    const summary = this.getEyeMovementsSummary();
    const max = Math.max(summary.center, summary.left, summary.right);
    //@ts-ignore
    return Object.keys(summary).find((key) => summary[key] === max);
  }


  getEyeMovements() {
    const summary = this.getEyeMovementsSummary();
    const max = Math.max(summary.center, summary.left, summary.right);
    //@ts-ignore
    const maxMovement = Object.keys(summary).find((key) => summary[key] === max);
    if (maxMovement != "center") {
      return 'More'
    }
    else {
      return 'Normal'
    }
  }

  getPostureConsistency() {
    const summary = this.getPostureSummary();
    const totalFrames = summary.positive + summary.negative;
    return {
      positivePercentage: (summary.positive / totalFrames) * 100,
      negativePercentage: (summary.negative / totalFrames) * 100,
    };
  }

  getDominantPosture() {
    const consistency = this.getPostureConsistency();
    const maxConsistency = Math.max(
      consistency.positivePercentage,
      consistency.negativePercentage
    );

    let dominantPosture = "Slouched";
    if (maxConsistency === consistency.positivePercentage) {
      dominantPosture = "Straight";
    }

    return {
      dominantPosture,
      confidence: maxConsistency,
    };
  }

  getEnglishQuality() {
    const prob = this.audioTranscript.english_probablity
    if (prob > 0 && prob <= 0.30) {
      return "Poor"
    }
    else if (prob > 0.30 && prob <= 0.6) {
      return 'Average'
    }
    else if (prob > 0.6 && prob <= 0.9) {
      return "Good"
    }
    else {
      return "Excellent"
    }
  }

  categorizeCameraDistance() {
    return this.avgCamDistance > 100 ? "far" : "near";
  }
}