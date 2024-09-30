import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressIndicatorComponent } from '../progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-progress-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ProgressIndicatorComponent
  ],
  templateUrl: './progress-stepper.component.html',
  styleUrl: './progress-stepper.component.sass'
})
export class ProgressStepperComponent {


  @Input()  totalSteps = 1
  @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();

  progressIncrementPerct: number = 0;
  activeIdx: number = 0;

  stepsMap: Array<{ done: boolean, active: boolean, visited: boolean }> = [];



  @Input() set activeIndex(idx: number) {
    if (this.stepsMap.length) {
      this.activeIdx = idx
      if (!this.stepsMap[idx].visited) {
        this.stepsMap[idx].visited = true
      }
      for (let i = 0; i < this.totalSteps; i++) {
        this.stepsMap[i] = {
          ...this.stepsMap[i],
          active: i === this.activeIdx,
          done: i < idx || this.stepsMap[i].visited
        };
      }
    }
  }


  get visitedCount() {
    return this.stepsMap.filter(step => step.done).length - 1
  }

  ngOnInit() {
    this.progressIncrementPerct = 100 / (this.totalSteps - 1)
    for (let i = 0; i < this.totalSteps; i++) {
      this.stepsMap.push({
        ...this.stepsMap[i],
        done: false,
        active: i === this.activeIdx,
        visited: i == 0
      });
    }
  }


  handleStepClick(index: number) {
    if (!this.stepsMap[index].done) {
      return
    }
    this.indexChange.emit(index)
  }
}
