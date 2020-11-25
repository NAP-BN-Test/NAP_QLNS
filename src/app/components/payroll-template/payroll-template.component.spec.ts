import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTemplateComponent } from './payroll-template.component';

describe('PayrollTemplateComponent', () => {
  let component: PayrollTemplateComponent;
  let fixture: ComponentFixture<PayrollTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
