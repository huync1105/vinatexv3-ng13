import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhohoiammathangmodalComponent } from './nhapkhohoiammathangmodal.component';

describe('NhapkhohoiammathangmodalComponent', () => {
  let component: NhapkhohoiammathangmodalComponent;
  let fixture: ComponentFixture<NhapkhohoiammathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhohoiammathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhohoiammathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
