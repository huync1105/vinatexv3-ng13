import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucphibanhangComponent } from './danhmucphibanhang.component';

describe('DanhmucphibanhangComponent', () => {
  let component: DanhmucphibanhangComponent;
  let fixture: ComponentFixture<DanhmucphibanhangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucphibanhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucphibanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
