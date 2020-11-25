import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDepartmentComponent } from './add-update-department.component';

describe('AddUpdateDepartmentComponent', () => {
  let component: AddUpdateDepartmentComponent;
  let fixture: ComponentFixture<AddUpdateDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
