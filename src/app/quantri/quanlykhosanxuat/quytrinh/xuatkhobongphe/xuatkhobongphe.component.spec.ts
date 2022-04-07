import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhobongpheComponent } from './xuatkhobongphe.component';

describe('XuatkhobongpheComponent', () => {
  let component: XuatkhobongpheComponent;
  let fixture: ComponentFixture<XuatkhobongpheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhobongpheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhobongpheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
