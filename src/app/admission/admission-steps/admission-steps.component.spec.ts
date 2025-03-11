import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionStepsComponent } from './admission-steps.component';

describe('AdmissionStepsComponent', () => {
  let component: AdmissionStepsComponent;
  let fixture: ComponentFixture<AdmissionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
