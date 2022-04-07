import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucdinhmucmathangComponent } from './danhmucdinhmucmathang.component';

describe('DanhmucdinhmucmathangComponent', () => {
  let component: DanhmucdinhmucmathangComponent;
  let fixture: ComponentFixture<DanhmucdinhmucmathangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucdinhmucmathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucdinhmucmathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
