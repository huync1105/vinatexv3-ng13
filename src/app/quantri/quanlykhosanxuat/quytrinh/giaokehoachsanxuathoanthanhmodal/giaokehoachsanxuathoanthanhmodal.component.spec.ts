import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiaokehoachsanxuathoanthanhmodalComponent } from './giaokehoachsanxuathoanthanhmodal.component';

describe('GiaokehoachsanxuathoanthanhmodalComponent', () => {
  let component: GiaokehoachsanxuathoanthanhmodalComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuathoanthanhmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuathoanthanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuathoanthanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
