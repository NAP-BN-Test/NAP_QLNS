import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeLeaveManagementComponent } from './take-leave-management.component';

describe('TakeLeaveManagementComponent', () => {
  let component: TakeLeaveManagementComponent;
  let fixture: ComponentFixture<TakeLeaveManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeLeaveManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeLeaveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
