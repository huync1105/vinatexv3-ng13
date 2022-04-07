import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KiemtrabanchephammodalComponent } from './kiemtrabanchephammodal.component';

describe('KiemtrabanchephammodalComponent', () => {
  let component: KiemtrabanchephammodalComponent;
  let fixture: ComponentFixture<KiemtrabanchephammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemtrabanchephammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemtrabanchephammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
