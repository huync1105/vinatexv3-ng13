import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachsanxuatmodalComponent } from './kehoachsanxuatmodal.component';

describe('KehoachsanxuatmodalComponent', () => {
  let component: KehoachsanxuatmodalComponent;
  let fixture: ComponentFixture<KehoachsanxuatmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
