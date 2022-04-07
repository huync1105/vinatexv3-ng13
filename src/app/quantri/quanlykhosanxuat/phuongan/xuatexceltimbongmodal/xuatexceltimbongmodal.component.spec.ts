import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatexceltimbongmodalComponent } from './xuatexceltimbongmodal.component';

describe('XuatexceltimbongmodalComponent', () => {
  let component: XuatexceltimbongmodalComponent;
  let fixture: ComponentFixture<XuatexceltimbongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatexceltimbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatexceltimbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
