import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TieuChiDanhGiaModalComponent } from './tieu-chi-danh-gia-modal.component';

describe('TieuChiDanhGiaModalComponent', () => {
  let component: TieuChiDanhGiaModalComponent;
  let fixture: ComponentFixture<TieuChiDanhGiaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChiDanhGiaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChiDanhGiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
