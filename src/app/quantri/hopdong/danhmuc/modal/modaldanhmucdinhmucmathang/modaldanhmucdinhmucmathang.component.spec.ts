import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmucdinhmucmathangComponent } from './modaldanhmucdinhmucmathang.component';

describe('ModaldanhmucdinhmucmathangComponent', () => {
  let component: ModaldanhmucdinhmucmathangComponent;
  let fixture: ComponentFixture<ModaldanhmucdinhmucmathangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucdinhmucmathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucdinhmucmathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
