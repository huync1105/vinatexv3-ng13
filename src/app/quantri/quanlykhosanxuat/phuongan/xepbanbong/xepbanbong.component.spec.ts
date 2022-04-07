import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XepbanbongComponent } from './xepbanbong.component';

describe('XepbanbongComponent', () => {
  let component: XepbanbongComponent;
  let fixture: ComponentFixture<XepbanbongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XepbanbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XepbanbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
