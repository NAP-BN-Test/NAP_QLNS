import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTrainingBeforeComponent } from './add-update-training-before.component';

describe('AddUpdateTrainingBeforeComponent', () => {
  let component: AddUpdateTrainingBeforeComponent;
  let fixture: ComponentFixture<AddUpdateTrainingBeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTrainingBeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTrainingBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
