import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KiemkekhoComponent } from './kiemkekho.component';

describe('KiemkekhoComponent', () => {
  let component: KiemkekhoComponent;
  let fixture: ComponentFixture<KiemkekhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
