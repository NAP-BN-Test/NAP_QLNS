import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTakeLeaveComponent } from './add-update-take-leave.component';

describe('AddUpdateTakeLeaveComponent', () => {
  let component: AddUpdateTakeLeaveComponent;
  let fixture: ComponentFixture<AddUpdateTakeLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTakeLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTakeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
