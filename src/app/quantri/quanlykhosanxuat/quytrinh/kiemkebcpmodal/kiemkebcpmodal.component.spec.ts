import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KiemkebcpmodalComponent } from './kiemkebcpmodal.component';

describe('KiemkebcpmodalComponent', () => {
  let component: KiemkebcpmodalComponent;
  let fixture: ComponentFixture<KiemkebcpmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkebcpmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkebcpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
