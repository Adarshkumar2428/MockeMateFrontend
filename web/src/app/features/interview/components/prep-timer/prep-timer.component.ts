import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { finalize, map, take, timer } from 'rxjs';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-prep-timer',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  templateUrl: './prep-timer.component.html',
  styleUrl: './prep-timer.component.sass'
})
export class PrepTimerComponent {

  private PREP_TIME = 10;
  prepCounter: number = 0;


  @Input() prepTimeCountdown: number = 10;
  @Input() showPrepMsg: boolean = true

  @Output() prepComplete: EventEmitter<void> = new EventEmitter();
  @Output() prepStarted: EventEmitter<void> = new EventEmitter();


  startPrep() {
    this.prepStarted.emit();
    timer(0, 1000)
      .pipe(
        take(this.PREP_TIME + 1),
        map((value: number) => this.PREP_TIME - value),
        finalize(() => {
          this.prepComplete.emit()
        })
      ).subscribe(value => {
        this.prepCounter = value
      })
  }
}
