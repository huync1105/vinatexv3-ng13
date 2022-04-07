import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachsanxuatComponent } from './kehoachsanxuat.component';

describe('KehoachsanxuatComponent', () => {
  let component: KehoachsanxuatComponent;
  let fixture: ComponentFixture<KehoachsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
