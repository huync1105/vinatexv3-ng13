import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietdanhsachhanghoaComponent } from './chitietdanhsachhanghoa.component';

describe('ChitietdanhsachhanghoaComponent', () => {
  let component: ChitietdanhsachhanghoaComponent;
  let fixture: ComponentFixture<ChitietdanhsachhanghoaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietdanhsachhanghoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietdanhsachhanghoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
