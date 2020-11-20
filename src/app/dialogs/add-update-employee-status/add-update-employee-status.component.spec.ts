import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateEmployeeStatusComponent } from './add-update-employee-status.component';

describe('AddUpdateEmployeeStatusComponent', () => {
  let component: AddUpdateEmployeeStatusComponent;
  let fixture: ComponentFixture<AddUpdateEmployeeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateEmployeeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateEmployeeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
