import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFamilyRelationshipComponent } from './add-update-family-relationship.component';

describe('AddUpdateFamilyRelationshipComponent', () => {
  let component: AddUpdateFamilyRelationshipComponent;
  let fixture: ComponentFixture<AddUpdateFamilyRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateFamilyRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFamilyRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
