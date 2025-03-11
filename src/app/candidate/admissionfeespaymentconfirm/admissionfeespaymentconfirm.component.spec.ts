import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionfeespaymentconfirmComponent } from './admissionfeespaymentconfirm.component';

describe('AdmissionfeespaymentconfirmComponent', () => {
  let component: AdmissionfeespaymentconfirmComponent;
  let fixture: ComponentFixture<AdmissionfeespaymentconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionfeespaymentconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionfeespaymentconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
