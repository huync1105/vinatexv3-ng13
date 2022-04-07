import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhanquyentheophanxuongmodalComponent } from './phanquyentheophanxuongmodal.component';

describe('PhanquyentheophanxuongmodalComponent', () => {
  let component: PhanquyentheophanxuongmodalComponent;
  let fixture: ComponentFixture<PhanquyentheophanxuongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanquyentheophanxuongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanquyentheophanxuongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
