import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTypeContractComponent } from './add-update-type-contract.component';

describe('AddUpdateTypeContractComponent', () => {
  let component: AddUpdateTypeContractComponent;
  let fixture: ComponentFixture<AddUpdateTypeContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTypeContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTypeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
