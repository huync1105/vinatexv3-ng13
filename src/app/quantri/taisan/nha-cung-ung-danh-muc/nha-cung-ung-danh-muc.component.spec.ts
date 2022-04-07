import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhaCungUngDanhMucComponent } from './nha-cung-ung-danh-muc.component';

describe('NhaCungUngDanhMucComponent', () => {
  let component: NhaCungUngDanhMucComponent;
  let fixture: ComponentFixture<NhaCungUngDanhMucComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaCungUngDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaCungUngDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
