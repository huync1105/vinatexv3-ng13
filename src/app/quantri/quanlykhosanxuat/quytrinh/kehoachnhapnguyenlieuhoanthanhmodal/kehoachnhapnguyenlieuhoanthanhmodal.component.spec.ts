import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachnhapnguyenlieuhoanthanhmodalComponent } from './kehoachnhapnguyenlieuhoanthanhmodal.component';

describe('KehoachnhapnguyenlieuhoanthanhmodalComponent', () => {
  let component: KehoachnhapnguyenlieuhoanthanhmodalComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieuhoanthanhmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieuhoanthanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieuhoanthanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
