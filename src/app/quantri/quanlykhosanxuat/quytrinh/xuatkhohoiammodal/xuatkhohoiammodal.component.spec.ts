import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhohoiammodalComponent } from './xuatkhohoiammodal.component';

describe('XuatkhohoiammodalComponent', () => {
  let component: XuatkhohoiammodalComponent;
  let fixture: ComponentFixture<XuatkhohoiammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhohoiammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhohoiammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
