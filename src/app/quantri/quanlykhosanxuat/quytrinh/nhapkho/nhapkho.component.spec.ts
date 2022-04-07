import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhoComponent } from './nhapkho.component';

describe('NhapkhoComponent', () => {
  let component: NhapkhoComponent;
  let fixture: ComponentFixture<NhapkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
