import { Component, ViewChild ,NgZone } from '@angular/core';
import { InterviewRecorderComponent, ISSDResult } from './components/interview-recorder/interview-recorder.component';
import { PrepTimerComponent } from './components/prep-timer/prep-timer.component';
import { map, Subject, takeUntil, BehaviorSubject, Observable, take, timer, finalize, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IInterviewFeedback } from './models/http/IInterviewFeedback';
import { Feedback } from './models/entity/Feeback.entity';
import { CommonModule, NgFor } from '@angular/common';
import { InterviewResponseHudComponent } from './components/interview-response-hud/interview-response-hud.component';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';

import * as tf from '@tensorflow/tfjs';
import { QuestionService } from './service/question.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { InterviewQuestionViewModel } from './models/view/interview-question.model';
import { ProgressStepperComponent } from './components/progress-stepper/progress-stepper.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { MatList, MatListItem } from '@angular/material/list';
import { MatChip, MatChipSet } from '@angular/material/chips';


@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    InterviewRecorderComponent,
    PrepTimerComponent,
    InterviewResponseHudComponent,
    MatButton,
    MatProgressBar,
    ProgressStepperComponent,
    ProgressIndicatorComponent,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatList,
    MatListItem,
    MatCard,
    MatCardTitle,
    MatChip,
    MatChipSet
  ],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.sass'
})
export class InterviewComponent {


  @ViewChild('recorder') videoRecorderElem!: InterviewRecorderComponent;
  recognition: any;
  isListening: boolean = false;
  transcript: string = '';

  videoInterviewResponse$ = new Subject<Feedback>();
  URL = "https://teachablemachine.withgoogle.com/models/8FGyQQ92l/";
  //recognizerModel!: speechCommands.SpeechCommandRecognizer;


  backgroundNoiseLevels = 0.0;
  backgroundPersonCount = 0.0;

  frameCounter = 0;


  interviewQues: BehaviorSubject<InterviewQuestionViewModel[]> = new BehaviorSubject<InterviewQuestionViewModel[]>([]);
  activeQuestionIdx: number = 0;
  interviewTimer: string = '';
  interviewStarted: boolean = false;

  private destroy$: Subject<void> = new Subject();
  private timer$!: Subscription;


  constructor(
    private http: HttpClient,
    private questionService: QuestionService,
    private zone: NgZone

  ) {   const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US'; }
    

  async ngOnInit() {
    //await tf.ready()
    //this.SpeechRecognition = await this.startSpeechRecognition();
    this.startSpeechRecognition();
    this.questionService
      .getQuestionsByCourse('AI', 'Data Analyst')
      .pipe(map(value => value.map(q => new InterviewQuestionViewModel(q))), take(1))
      .subscribe(value => {
        this.interviewQues.next(value);
      })
  }
    // Initialize Web Speech API instead of TensorFlow's model
    startSpeechRecognition() {
      this.isListening = true;
      this.recognition.start();
  
      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.transcript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        this.zone.run(() => {
          this.transcript = this.transcript || interimTranscript;
        });
      };
  
      this.recognition.onerror = (event: any) => {
        console.error('Speech Recognition Error:', event.error);
        this.isListening = false;
      };
  
      this.recognition.onend = () => {
        this.isListening = false;
      };
    }

    stopSpeechRecognition() {
      this.recognition.stop();
      this.isListening = false;
    }
  
    // detectBackgroundNoise() {
    //   // Implement custom logic for background noise detection here (e.g., noise thresholding, or basic audio analysis)
    //   this.backgroundNoiseLevels = Math.random();  // Replace with actual background noise detection logic
    // }
  

  incCounter() {
    this.activeQuestionIdx += 1
  }

  // async createModel() {
  //   const checkpointURL = this.URL + "model.json"; // model topology
  //   const metadataURL = this.URL + "metadata.json"; // model metadata

  //   const recognizer = speechCommands.create(
  //     "BROWSER_FFT", // fourier transform type, not useful to change
  //     undefined, // speech commands vocabulary feature, not useful for your models
  //     checkpointURL,
  //     metadataURL);

  //   // check that model and metadata are loaded via HTTPS requests.
  //   await recognizer.ensureModelLoaded();
  //   return recognizer;
  // }

  async detectBackgroundNoise() {
    console.log("Detecting Background Noise");
  
    // Initialize noise detection logic
    const noiseDetectionInterval = setInterval(() => {
      if (this.isListening) {
        // Check the last interim results to see if there's any background noise
        if (this.transcript) {
          // Assuming that if there is any transcript, it indicates some level of noise
          this.backgroundNoiseLevels = Math.min(this.backgroundNoiseLevels + 0.1, 1); // Increase noise level
        } else {
          this.backgroundNoiseLevels = Math.max(this.backgroundNoiseLevels - 0.1, 0); // Decrease noise level
        }
  
        // Update the background noise level in the current question data
        this.interviewQuesData[this.activeQuestionIdx].backgroundNoiseLevel.push(this.backgroundNoiseLevels);
      }
    }, 1000); // Check every second
  
    // Stop noise detection when speech recognition ends
    this.recognition.onend = () => {
      clearInterval(noiseDetectionInterval);
      this.isListening = false;
    };
  }
  


  startTimer() {
    this.timer$ = timer(0, 1000)
      .pipe(
        take(59),
        finalize(() => {
          // done
          this.videoRecorderElem.stopRecorder();
        })
      ).subscribe(value => {
        const secRemaining = 60 - value
        this.interviewTimer = `00:${secRemaining < 10 ? "0" : ""}${secRemaining}`
      })
  }

  handleVideoRecorded(videoRecording: Blob) {
    const quesData = this.interviewQuesData;
    debugger;
    quesData[this.activeQuestionIdx].interviewRecorded = true
    quesData[this.activeQuestionIdx].setPreviewURL(videoRecording);

    const ques = quesData[this.activeQuestionIdx].interviewQuestion;

    const formData = new FormData();
    formData.append("video", videoRecording)
    formData.append("question", ques.question)
    formData.append("keyPt1", ques.keyPoint1)
    formData.append("keyPt2", ques.keyPoint2)
    formData.append("keyPt3", ques.keyPoint3)
    formData.append("questionKey", quesData[this.activeQuestionIdx].questionId);

    this.http.post<IInterviewFeedback>('http://localhost:5000/upload', formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const feedback = new Feedback(data.feedback);
        const quesFeedback = quesData.find(que => que.questionId == data.questionKey);
        if (quesFeedback) {
          quesFeedback.feedbackResponse = feedback;
          this.interviewQues.next([...quesData]);
        }
      });

    this.handleQuestionChange(this.activeQuestionIdx + 1);
    this.resetStates();
  }

  handleQuestionChange(changeIdx: number) {
    this.activeQuestionIdx = changeIdx
    const ques = this.interviewQuesData[changeIdx];
    if (ques.videoBlob) {
      this.videoRecorderElem.setVideoURL(ques.videoBlob)
    }
    else {
      this.videoRecorderElem.resetVideo()
    }
    this.interviewQues.next(this.interviewQuesData)
  }

  get interviewQuesData() {
    return this.interviewQues.getValue();
  }


  handlePrepComplete() {
    this.videoRecorderElem.handleRecord();
    this.startTimer();
  }

  handlePrepStarted() {
    this.videoRecorderElem.startStream().then(_ => {
      this.interviewStarted = true;
      this.detectBackgroundNoise()
    })
      .catch(err => {
        console.log(err)
      })
  }


  handleObjectDetectionResult(result: ISSDResult[]) {
    this.detectPersons(result);
    if (result.length) {
      const personCount = result.filter(s => s.class == 'person').length;
      this.backgroundPersonCount = personCount;
      console.log(`Persons detected: ${personCount}`);
    }
  }


  async handleFileUpload(event: Event) {
    const fileEvent = event.currentTarget as HTMLInputElement
    const files = fileEvent.files
    console.log(files);
    if (files) {
      const interviewVideo = await files[0].arrayBuffer();
      const interviewBlob = new Blob([new Uint8Array(interviewVideo)], { type: files[0].type })
      this.handleVideoRecorded(interviewBlob)
    }

  }


  resetStates() {
    // reset background noise
    this.backgroundNoiseLevels = 0.0;

    // reset timer
    this.interviewTimer = '';

    // reset person count
    this.backgroundPersonCount = 0;

    // 
    this.interviewStarted = false;

    // stop listening

    // if (this.recognizerModel.isListening()) {
    //   this.recognizerModel.stopListening()
    // }

    if(this.timer$) {
      this.timer$.unsubscribe();
    }

  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
    this.stopSpeechRecognition(); 
  }
}
