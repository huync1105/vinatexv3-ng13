import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachhopdongbongxoComponent } from './danhsachhopdongbongxo.component';

describe('DanhsachhopdongbongxoComponent', () => {
  let component: DanhsachhopdongbongxoComponent;
  let fixture: ComponentFixture<DanhsachhopdongbongxoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
