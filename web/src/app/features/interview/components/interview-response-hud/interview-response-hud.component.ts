import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewQuestionViewModel } from '../../models/view/interview-question.model';

@Component({
  selector: 'app-interview-response-hud',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './interview-response-hud.component.html',
  styleUrl: './interview-response-hud.component.sass'
})
export class InterviewResponseHudComponent {
  @Input() interviewResponse!: InterviewQuestionViewModel;
}
