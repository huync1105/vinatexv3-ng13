import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiaokehoachsanxuatComponent } from './giaokehoachsanxuat.component';

describe('GiaokehoachsanxuatComponent', () => {
  let component: GiaokehoachsanxuatComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
