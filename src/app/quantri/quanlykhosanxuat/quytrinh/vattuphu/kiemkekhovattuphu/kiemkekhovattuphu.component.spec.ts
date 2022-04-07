import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KiemkekhovattuphuComponent } from './kiemkekhovattuphu.component';

describe('KiemkekhovattuphuComponent', () => {
  let component: KiemkekhovattuphuComponent;
  let fixture: ComponentFixture<KiemkekhovattuphuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhovattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhovattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
