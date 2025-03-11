import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFormChallanComponent } from './print-form-challan.component';

describe('PrintFormChallanComponent', () => {
  let component: PrintFormChallanComponent;
  let fixture: ComponentFixture<PrintFormChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintFormChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFormChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
