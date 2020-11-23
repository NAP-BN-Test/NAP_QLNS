import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAttendanceManagementComponent } from './time-attendance-management.component';

describe('TimeAttendanceManagementComponent', () => {
  let component: TimeAttendanceManagementComponent;
  let fixture: ComponentFixture<TimeAttendanceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAttendanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAttendanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
