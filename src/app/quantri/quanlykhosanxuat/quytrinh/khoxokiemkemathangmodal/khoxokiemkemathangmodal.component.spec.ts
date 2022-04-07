import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhoxokiemkemathangmodalComponent } from './khoxokiemkemathangmodal.component';

describe('KhoxokiemkemathangmodalComponent', () => {
  let component: KhoxokiemkemathangmodalComponent;
  let fixture: ComponentFixture<KhoxokiemkemathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoxokiemkemathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoxokiemkemathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
