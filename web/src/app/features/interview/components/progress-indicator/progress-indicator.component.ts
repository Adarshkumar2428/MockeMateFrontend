import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './progress-indicator.component.html',
  styleUrl: './progress-indicator.component.sass'
})
export class ProgressIndicatorComponent {
  @Input() done: boolean = false;
  @Input() active: boolean = false;
}
