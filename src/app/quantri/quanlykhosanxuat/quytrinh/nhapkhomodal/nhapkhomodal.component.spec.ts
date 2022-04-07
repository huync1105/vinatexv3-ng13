import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhomodalComponent } from './nhapkhomodal.component';

describe('NhapkhomodalComponent', () => {
  let component: NhapkhomodalComponent;
  let fixture: ComponentFixture<NhapkhomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
