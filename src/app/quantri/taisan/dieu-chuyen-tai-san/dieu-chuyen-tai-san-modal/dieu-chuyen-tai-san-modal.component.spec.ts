import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DieuChuyenTaiSanModalComponent } from './dieu-chuyen-tai-san-modal.component';

describe('DieuChuyenTaiSanModalComponent', () => {
  let component: DieuChuyenTaiSanModalComponent;
  let fixture: ComponentFixture<DieuChuyenTaiSanModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuChuyenTaiSanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuChuyenTaiSanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
