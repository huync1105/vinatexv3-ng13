import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhoxokiemkemodalComponent } from './khoxokiemkemodal.component';

describe('KhoxokiemkemodalComponent', () => {
  let component: KhoxokiemkemodalComponent;
  let fixture: ComponentFixture<KhoxokiemkemodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoxokiemkemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoxokiemkemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
