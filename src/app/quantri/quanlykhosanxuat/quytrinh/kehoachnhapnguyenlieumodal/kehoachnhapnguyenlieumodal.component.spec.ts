import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachnhapnguyenlieumodalComponent } from './kehoachnhapnguyenlieumodal.component';

describe('KehoachnhapnguyenlieumodalComponent', () => {
  let component: KehoachnhapnguyenlieumodalComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
