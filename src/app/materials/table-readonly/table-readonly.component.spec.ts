import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReadonlyComponent } from './table-readonly.component';

describe('TableReadonlyComponent', () => {
  let component: TableReadonlyComponent;
  let fixture: ComponentFixture<TableReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
