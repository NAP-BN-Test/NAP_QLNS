import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTrainingAfterComponent } from './add-update-training-after.component';

describe('AddUpdateTrainingAfterComponent', () => {
  let component: AddUpdateTrainingAfterComponent;
  let fixture: ComponentFixture<AddUpdateTrainingAfterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTrainingAfterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTrainingAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
