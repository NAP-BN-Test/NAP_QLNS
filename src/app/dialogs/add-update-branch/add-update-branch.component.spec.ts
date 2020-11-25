import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBranchComponent } from './add-update-branch.component';

describe('AddUpdateBranchComponent', () => {
  let component: AddUpdateBranchComponent;
  let fixture: ComponentFixture<AddUpdateBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
