import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhothanhphammodalComponent } from './nhapkhothanhphammodal.component';

describe('NhapkhothanhphammodalComponent', () => {
  let component: NhapkhothanhphammodalComponent;
  let fixture: ComponentFixture<NhapkhothanhphammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhothanhphammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhothanhphammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
