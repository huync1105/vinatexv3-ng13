import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucthutucthanhtoanComponent } from './danhmucthutucthanhtoan.component';

describe('DanhmucthutucthanhtoanComponent', () => {
  let component: DanhmucthutucthanhtoanComponent;
  let fixture: ComponentFixture<DanhmucthutucthanhtoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucthutucthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucthutucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
