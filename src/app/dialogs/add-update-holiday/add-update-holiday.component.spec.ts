import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateHolidayComponent } from './add-update-holiday.component';

describe('AddUpdateHolidayComponent', () => {
  let component: AddUpdateHolidayComponent;
  let fixture: ComponentFixture<AddUpdateHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
