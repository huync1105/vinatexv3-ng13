import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhoxomathangmodalComponent } from './xuatkhoxomathangmodal.component';

describe('XuatkhoxomathangmodalComponent', () => {
  let component: XuatkhoxomathangmodalComponent;
  let fixture: ComponentFixture<XuatkhoxomathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoxomathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoxomathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
