import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinepaymentComponent } from './onlinepayment.component';

describe('OnlinepaymentComponent', () => {
  let component: OnlinepaymentComponent;
  let fixture: ComponentFixture<OnlinepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
