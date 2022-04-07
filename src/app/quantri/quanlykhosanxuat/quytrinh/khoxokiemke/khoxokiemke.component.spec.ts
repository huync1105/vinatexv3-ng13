import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhoxokiemkeComponent } from './khoxokiemke.component';

describe('KhoxokiemkeComponent', () => {
  let component: KhoxokiemkeComponent;
  let fixture: ComponentFixture<KhoxokiemkeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoxokiemkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoxokiemkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
