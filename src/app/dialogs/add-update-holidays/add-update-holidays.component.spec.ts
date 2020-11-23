import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateHolidaysComponent } from './add-update-holidays.component';

describe('AddUpdateHolidaysComponent', () => {
  let component: AddUpdateHolidaysComponent;
  let fixture: ComponentFixture<AddUpdateHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
