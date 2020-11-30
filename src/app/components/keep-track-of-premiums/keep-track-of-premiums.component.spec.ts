import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepTrackOfPremiumsComponent } from './keep-track-of-premiums.component';

describe('KeepTrackOfPremiumsComponent', () => {
  let component: KeepTrackOfPremiumsComponent;
  let fixture: ComponentFixture<KeepTrackOfPremiumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepTrackOfPremiumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepTrackOfPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
