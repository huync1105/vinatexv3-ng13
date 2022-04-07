import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachtinhluongComponent } from './danhsachtinhluong.component';

describe('DanhsachtinhluongComponent', () => {
  let component: DanhsachtinhluongComponent;
  let fixture: ComponentFixture<DanhsachtinhluongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtinhluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtinhluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
