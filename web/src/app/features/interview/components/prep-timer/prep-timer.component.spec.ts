import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepTimerComponent } from './prep-timer.component';

describe('PrepTimerComponent', () => {
  let component: PrepTimerComponent;
  let fixture: ComponentFixture<PrepTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepTimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
