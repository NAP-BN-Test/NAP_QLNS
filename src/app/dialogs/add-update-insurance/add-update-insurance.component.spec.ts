import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateInsuranceComponent } from './add-update-insurance.component';

describe('AddUpdateInsuranceComponent', () => {
  let component: AddUpdateInsuranceComponent;
  let fixture: ComponentFixture<AddUpdateInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
