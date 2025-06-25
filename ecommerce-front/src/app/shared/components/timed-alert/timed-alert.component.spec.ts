import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedAlertComponent } from './timed-alert.component';

describe('TimedAlertComponent', () => {
  let component: TimedAlertComponent;
  let fixture: ComponentFixture<TimedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimedAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
