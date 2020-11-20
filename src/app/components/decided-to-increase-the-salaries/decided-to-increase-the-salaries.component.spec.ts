import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecidedToIncreaseTheSalariesComponent } from './decided-to-increase-the-salaries.component';

describe('DecidedToIncreaseTheSalariesComponent', () => {
  let component: DecidedToIncreaseTheSalariesComponent;
  let fixture: ComponentFixture<DecidedToIncreaseTheSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecidedToIncreaseTheSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecidedToIncreaseTheSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
