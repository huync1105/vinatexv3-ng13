import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachsanxuatthangmodalComponent } from './kehoachsanxuatthangmodal.component';

describe('KehoachsanxuatthangmodalComponent', () => {
  let component: KehoachsanxuatthangmodalComponent;
  let fixture: ComponentFixture<KehoachsanxuatthangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatthangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatthangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
