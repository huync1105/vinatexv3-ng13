import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongTinHangHoaModalComponent } from './thong-tin-hang-hoa-modal.component';

describe('ThongTinHangHoaModalComponent', () => {
  let component: ThongTinHangHoaModalComponent;
  let fixture: ComponentFixture<ThongTinHangHoaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinHangHoaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinHangHoaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
