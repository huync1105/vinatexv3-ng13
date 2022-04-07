import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhoxomodalComponent } from './xuatkhoxomodal.component';

describe('XuatkhoxomodalComponent', () => {
  let component: XuatkhoxomodalComponent;
  let fixture: ComponentFixture<XuatkhoxomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
