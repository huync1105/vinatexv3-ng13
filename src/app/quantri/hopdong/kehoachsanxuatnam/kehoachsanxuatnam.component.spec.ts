import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachsanxuatnamComponent } from './kehoachsanxuatnam.component';

describe('KehoachsanxuatnamComponent', () => {
  let component: KehoachsanxuatnamComponent;
  let fixture: ComponentFixture<KehoachsanxuatnamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
