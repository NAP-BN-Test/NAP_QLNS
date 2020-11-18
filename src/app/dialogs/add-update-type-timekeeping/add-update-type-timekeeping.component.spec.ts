import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTypeTimekeepingComponent } from './add-update-type-timekeeping.component';

describe('AddUpdateTypeTimekeepingComponent', () => {
  let component: AddUpdateTypeTimekeepingComponent;
  let fixture: ComponentFixture<AddUpdateTypeTimekeepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTypeTimekeepingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTypeTimekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
