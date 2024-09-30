import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRecorderComponent } from './interview-recorder.component';

describe('InterviewRecorderComponent', () => {
  let component: InterviewRecorderComponent;
  let fixture: ComponentFixture<InterviewRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewRecorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
