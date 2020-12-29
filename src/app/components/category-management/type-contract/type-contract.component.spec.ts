import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContractComponent } from './type-contract.component';

describe('TypeContractComponent', () => {
  let component: TypeContractComponent;
  let fixture: ComponentFixture<TypeContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
