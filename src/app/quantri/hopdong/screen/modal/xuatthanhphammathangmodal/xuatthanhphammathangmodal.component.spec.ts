import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatthanhphammathangmodalComponent } from './xuatthanhphammathangmodal.component';

describe('XuatthanhphammathangmodalComponent', () => {
  let component: XuatthanhphammathangmodalComponent;
  let fixture: ComponentFixture<XuatthanhphammathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatthanhphammathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatthanhphammathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
