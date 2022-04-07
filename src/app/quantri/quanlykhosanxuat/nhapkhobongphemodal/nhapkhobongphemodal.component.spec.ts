import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhobongphemodalComponent } from './nhapkhobongphemodal.component';

describe('NhapkhobongphemodalComponent', () => {
  let component: NhapkhobongphemodalComponent;
  let fixture: ComponentFixture<NhapkhobongphemodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhobongphemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhobongphemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
