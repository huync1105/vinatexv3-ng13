import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { Phuhung1Component } from './phuhung1.component';

describe('Phuhung1Component', () => {
  let component: Phuhung1Component;
  let fixture: ComponentFixture<Phuhung1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Phuhung1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phuhung1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
