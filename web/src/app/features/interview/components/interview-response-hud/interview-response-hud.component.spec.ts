import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewResponseHudComponent } from './interview-response-hud.component';

describe('InterviewResponseHudComponent', () => {
  let component: InterviewResponseHudComponent;
  let fixture: ComponentFixture<InterviewResponseHudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewResponseHudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewResponseHudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
