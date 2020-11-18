import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTimekeepingComponent } from './type-timekeeping.component';

describe('TypeTimekeepingComponent', () => {
  let component: TypeTimekeepingComponent;
  let fixture: ComponentFixture<TypeTimekeepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTimekeepingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTimekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
