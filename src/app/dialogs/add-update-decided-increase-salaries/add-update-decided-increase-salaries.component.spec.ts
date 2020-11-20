import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDecidedIncreaseSalariesComponent } from './add-update-decided-increase-salaries.component';

describe('AddUpdateDecidedIncreaseSalariesComponent', () => {
  let component: AddUpdateDecidedIncreaseSalariesComponent;
  let fixture: ComponentFixture<AddUpdateDecidedIncreaseSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateDecidedIncreaseSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateDecidedIncreaseSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
