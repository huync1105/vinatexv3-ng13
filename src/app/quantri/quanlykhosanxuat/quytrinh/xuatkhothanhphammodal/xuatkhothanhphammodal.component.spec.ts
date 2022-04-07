import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhothanhphammodalComponent } from './xuatkhothanhphammodal.component';

describe('XuatkhothanhphammodalComponent', () => {
  let component: XuatkhothanhphammodalComponent;
  let fixture: ComponentFixture<XuatkhothanhphammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhothanhphammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhothanhphammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
