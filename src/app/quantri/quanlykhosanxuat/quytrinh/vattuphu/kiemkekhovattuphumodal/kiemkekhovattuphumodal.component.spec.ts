import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KiemkekhovattuphumodalComponent } from './kiemkekhovattuphumodal.component';

describe('KiemkekhovattuphumodalComponent', () => {
  let component: KiemkekhovattuphumodalComponent;
  let fixture: ComponentFixture<KiemkekhovattuphumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhovattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhovattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
