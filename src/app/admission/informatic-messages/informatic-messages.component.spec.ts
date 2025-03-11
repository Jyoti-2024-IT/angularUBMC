import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformaticMessagesComponent } from './informatic-messages.component';

describe('InformaticMessagesComponent', () => {
  let component: InformaticMessagesComponent;
  let fixture: ComponentFixture<InformaticMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformaticMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformaticMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
