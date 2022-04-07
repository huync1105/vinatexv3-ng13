import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongTinDanhGiaComponent } from './thong-tin-danh-gia.component';

describe('ThongTinDanhGiaComponent', () => {
  let component: ThongTinDanhGiaComponent;
  let fixture: ComponentFixture<ThongTinDanhGiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinDanhGiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinDanhGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
