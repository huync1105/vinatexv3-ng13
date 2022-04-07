import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhobongphemodalComponent } from './xuatkhobongphemodal.component';

describe('XuatkhobongphemodalComponent', () => {
  let component: XuatkhobongphemodalComponent;
  let fixture: ComponentFixture<XuatkhobongphemodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhobongphemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhobongphemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
