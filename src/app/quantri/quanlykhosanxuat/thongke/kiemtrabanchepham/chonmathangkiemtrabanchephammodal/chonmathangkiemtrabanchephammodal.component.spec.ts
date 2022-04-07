import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonmathangkiemtrabanchephammodalComponent } from './chonmathangkiemtrabanchephammodal.component';

describe('ChonmathangkiemtrabanchephammodalComponent', () => {
  let component: ChonmathangkiemtrabanchephammodalComponent;
  let fixture: ComponentFixture<ChonmathangkiemtrabanchephammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonmathangkiemtrabanchephammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonmathangkiemtrabanchephammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
