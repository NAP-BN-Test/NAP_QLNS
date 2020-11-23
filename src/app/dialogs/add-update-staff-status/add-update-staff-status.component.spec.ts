import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStaffStatusComponent } from './add-update-staff-status.component';

describe('AddUpdateStaffStatusComponent', () => {
  let component: AddUpdateStaffStatusComponent;
  let fixture: ComponentFixture<AddUpdateStaffStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateStaffStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateStaffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
