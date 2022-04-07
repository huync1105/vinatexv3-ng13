import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonTaiSanDieuChuyenModalComponent } from './chon-tai-san-dieu-chuyen-modal.component';

describe('ChonTaiSanDieuChuyenModalComponent', () => {
  let component: ChonTaiSanDieuChuyenModalComponent;
  let fixture: ComponentFixture<ChonTaiSanDieuChuyenModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonTaiSanDieuChuyenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonTaiSanDieuChuyenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
