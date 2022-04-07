import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TrienkhaikehoachsanxuathoanthanhmodalComponent } from './trienkhaikehoachsanxuathoanthanhmodal.component';

describe('TrienkhaikehoachsanxuathoanthanhmodalComponent', () => {
  let component: TrienkhaikehoachsanxuathoanthanhmodalComponent;
  let fixture: ComponentFixture<TrienkhaikehoachsanxuathoanthanhmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrienkhaikehoachsanxuathoanthanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrienkhaikehoachsanxuathoanthanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
