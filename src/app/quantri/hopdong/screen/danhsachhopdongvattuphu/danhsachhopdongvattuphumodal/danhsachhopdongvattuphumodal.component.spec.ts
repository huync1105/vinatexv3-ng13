import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachhopdongvattuphumodalComponent } from './danhsachhopdongvattuphumodal.component';

describe('DanhsachhopdongvattuphumodalComponent', () => {
  let component: DanhsachhopdongvattuphumodalComponent;
  let fixture: ComponentFixture<DanhsachhopdongvattuphumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
