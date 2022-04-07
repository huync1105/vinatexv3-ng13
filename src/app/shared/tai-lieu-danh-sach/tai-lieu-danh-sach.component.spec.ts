import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TaiLieuDanhSachComponent } from './tai-lieu-danh-sach.component';

describe('TaiLieuDanhSachComponent', () => {
  let component: TaiLieuDanhSachComponent;
  let fixture: ComponentFixture<TaiLieuDanhSachComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiLieuDanhSachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiLieuDanhSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
