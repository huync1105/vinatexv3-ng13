import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachsanxuatthangComponent } from './kehoachsanxuatthang.component';

describe('KehoachsanxuatthangComponent', () => {
  let component: KehoachsanxuatthangComponent;
  let fixture: ComponentFixture<KehoachsanxuatthangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
