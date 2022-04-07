import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiaokehoachsanxuathoanthanhComponent } from './giaokehoachsanxuathoanthanh.component';

describe('GiaokehoachsanxuathoanthanhComponent', () => {
  let component: GiaokehoachsanxuathoanthanhComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuathoanthanhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuathoanthanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuathoanthanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
