import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TieuChiDanhGiaNhaComponent } from './tieu-chi-danh-gia-nha.component';

describe('TieuChiDanhGiaNhaComponent', () => {
  let component: TieuChiDanhGiaNhaComponent;
  let fixture: ComponentFixture<TieuChiDanhGiaNhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChiDanhGiaNhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChiDanhGiaNhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
