import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhoComponent } from './xuatkho.component';

describe('XuatkhoComponent', () => {
  let component: XuatkhoComponent;
  let fixture: ComponentFixture<XuatkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
