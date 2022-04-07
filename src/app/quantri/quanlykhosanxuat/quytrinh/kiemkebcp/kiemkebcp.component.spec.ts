import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KiemkebcpComponent } from './kiemkebcp.component';

describe('KiemkebcpComponent', () => {
  let component: KiemkebcpComponent;
  let fixture: ComponentFixture<KiemkebcpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkebcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkebcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
