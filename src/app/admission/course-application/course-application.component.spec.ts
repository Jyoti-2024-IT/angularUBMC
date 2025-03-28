import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseApplicationComponent } from './course-application.component';

describe('CourseApplicationComponent', () => {
  let component: CourseApplicationComponent;
  let fixture: ComponentFixture<CourseApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
