import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionfeespaymentComponent } from './admissionfeespayment.component';

describe('AdmissionfeespaymentComponent', () => {
  let component: AdmissionfeespaymentComponent;
  let fixture: ComponentFixture<AdmissionfeespaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionfeespaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionfeespaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
