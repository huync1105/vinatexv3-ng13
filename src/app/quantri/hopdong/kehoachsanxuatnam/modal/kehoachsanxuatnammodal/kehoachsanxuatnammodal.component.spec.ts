import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachsanxuatnammodalComponent } from './kehoachsanxuatnammodal.component';

describe('KehoachsanxuatnammodalComponent', () => {
  let component: KehoachsanxuatnammodalComponent;
  let fixture: ComponentFixture<KehoachsanxuatnammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatnammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatnammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
