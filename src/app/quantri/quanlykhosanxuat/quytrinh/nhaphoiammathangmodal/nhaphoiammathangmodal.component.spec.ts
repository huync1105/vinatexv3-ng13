import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhaphoiammathangmodalComponent } from './nhaphoiammathangmodal.component';

describe('NhaphoiammathangmodalComponent', () => {
  let component: NhaphoiammathangmodalComponent;
  let fixture: ComponentFixture<NhaphoiammathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaphoiammathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaphoiammathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
