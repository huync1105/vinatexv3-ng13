import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiaokehoachsanxuatmodalComponent } from './giaokehoachsanxuatmodal.component';

describe('GiaokehoachsanxuatmodalComponent', () => {
  let component: GiaokehoachsanxuatmodalComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuatmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
