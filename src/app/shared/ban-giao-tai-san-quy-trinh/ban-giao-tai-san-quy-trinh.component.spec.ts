import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BanGiaoTaiSanQuyTrinhComponent } from './ban-giao-tai-san-quy-trinh.component';

describe('BanGiaoTaiSanQuyTrinhComponent', () => {
  let component: BanGiaoTaiSanQuyTrinhComponent;
  let fixture: ComponentFixture<BanGiaoTaiSanQuyTrinhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BanGiaoTaiSanQuyTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanGiaoTaiSanQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
