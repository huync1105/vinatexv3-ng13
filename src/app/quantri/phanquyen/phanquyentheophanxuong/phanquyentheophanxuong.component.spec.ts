import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhanquyentheophanxuongComponent } from './phanquyentheophanxuong.component';

describe('PhanquyentheophanxuongComponent', () => {
  let component: PhanquyentheophanxuongComponent;
  let fixture: ComponentFixture<PhanquyentheophanxuongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanquyentheophanxuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanquyentheophanxuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
