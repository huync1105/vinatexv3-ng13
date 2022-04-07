import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { Sucosuachua2Component } from './sucosuachua2.component';

describe('Sucosuachua2Component', () => {
  let component: Sucosuachua2Component;
  let fixture: ComponentFixture<Sucosuachua2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sucosuachua2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sucosuachua2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
