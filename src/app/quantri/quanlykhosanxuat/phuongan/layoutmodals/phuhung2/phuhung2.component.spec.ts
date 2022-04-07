import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { Phuhung2Component } from './phuhung2.component';

describe('Phuhung2Component', () => {
  let component: Phuhung2Component;
  let fixture: ComponentFixture<Phuhung2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Phuhung2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phuhung2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
