import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmuchinhthucthanhtoanComponent } from './danhmuchinhthucthanhtoan.component';

describe('DanhmuchinhthucthanhtoanComponent', () => {
  let component: DanhmuchinhthucthanhtoanComponent;
  let fixture: ComponentFixture<DanhmuchinhthucthanhtoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuchinhthucthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuchinhthucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
