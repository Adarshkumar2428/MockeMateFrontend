import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterContentChecked, EventEmitter, Output, Input, NgZone } from '@angular/core';
import { PrepTimerComponent } from '../prep-timer/prep-timer.component';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

export interface ISSDResult {
  class: string;
  score: number;
}


@Component({
  selector: 'app-interview-recorder',
  standalone: true,
  imports: [CommonModule, PrepTimerComponent],
  templateUrl: './interview-recorder.component.html',
  styleUrl: './interview-recorder.component.sass'
})
export class InterviewRecorderComponent implements AfterContentChecked {


  @Input() videoPreviewUrl!: string;

  @ViewChild("videoElem") videoElem!: ElementRef<HTMLVideoElement>;
  @ViewChild("downloadAnchor") downloadAnchor!: ElementRef<HTMLAnchorElement>;


  @Output() videoRecorded: EventEmitter<Blob> = new EventEmitter();
  @Output() objDetectionResult: EventEmitter<ISSDResult[]> = new EventEmitter();
  worker!: Worker;




  videoElemLoaded = false;
  startRecording = false;
  mediaStream!: MediaStream;
  mediaRecoder!: MediaRecorder
  private mediaChunks: Array<Blob> = []


  constructor(private ngZone: NgZone) {
    this.worker = new Worker(new URL("./object-detection-worker.ts", import.meta.url));
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
    this.worker.postMessage({ type: 'init' });
  }

  handleWorkerMessage(event: MessageEvent) {
    this.ngZone.run(() => {
      if (event.data.type === 'predictions') {
        const preds = event.data.predictions as Array<ISSDResult>;
        this.objDetectionResult.emit(preds);
        setTimeout(() => this.detectObjects(), 300);
      } else if (event.data.type === 'init' && event.data.status === 'initialized') {
        console.log("Worker Initialized")
      }
    });
  }

  ngAfterContentChecked(): void {
    if (this.videoElem) {
      this.videoElemLoaded = true
    }
  }

  async startStream() {
    try {
      console.log("recording stuff");
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: innerWidth,
          height: innerHeight
        },
        preferCurrentTab: true
      });

      this.mediaRecoder = new MediaRecorder(this.mediaStream, {
        mimeType: 'video/webm'
      });
      this.videoElem.nativeElement.srcObject = this.mediaStream
      this.videoElem.nativeElement.onloadedmetadata = () => {
        this.videoElem.nativeElement.play()
        this.detectObjects();
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  detectObjects() {
    if (!this.videoPreviewUrl && this.videoElem.nativeElement.readyState == 4) {
      const frame = tf.browser.fromPixels(this.videoElem.nativeElement);
      const flattenedTensor = frame.flatten().arraySync();
      this.worker.postMessage({
        type: 'detect', frame: {
          tensor: flattenedTensor,
          width: frame.shape[0],
          height: frame.shape[1]
        }
      });

      frame.dispose()
    }
  }

  handleRecord() {
    this.startRecording = true
    this.mediaChunks = []

    this.mediaRecoder.start(1000) // send snapshot every 1s 
    this.mediaRecoder.ondataavailable = (event) => {
      this.mediaChunks.push(event.data)
    }
    this.mediaRecoder.onstop = this.handleVideoStop.bind(this);
  }

  handleVideoStop() {
    this.videoElem.nativeElement.srcObject = null;
    const videoBlob = new Blob(this.mediaChunks, {
      type: "video/webm; codecs=webm"
    })
    this.videoRecorded.emit(videoBlob)
    this.mediaStream.getTracks().forEach(track => track.stop())
  }


  stopRecorder() {
    if (this.mediaRecoder) {
      this.mediaRecoder.stop()
    }
  }

  setVideoURL(url: string) {
    this.videoElem.nativeElement.src = url;
    this.videoElem.nativeElement.controls = true
    this.videoElem.nativeElement.play()
  }

  resetVideo() {
    this.mediaChunks = [];
    this.videoElem.nativeElement.src = "";
    this.videoElem.nativeElement.controls = false
    this.startRecording = false;
  }
}
