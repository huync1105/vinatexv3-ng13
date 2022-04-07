import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhomNhaCungUngDanhMucComponent } from './nhom-nha-cung-ung-danh-muc.component';

describe('NhomNhaCungUngDanhMucComponent', () => {
  let component: NhomNhaCungUngDanhMucComponent;
  let fixture: ComponentFixture<NhomNhaCungUngDanhMucComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomNhaCungUngDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomNhaCungUngDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
