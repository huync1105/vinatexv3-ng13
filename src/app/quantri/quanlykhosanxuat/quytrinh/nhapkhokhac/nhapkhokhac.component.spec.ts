import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhokhacComponent } from './nhapkhokhac.component';

describe('NhapkhokhacComponent', () => {
  let component: NhapkhokhacComponent;
  let fixture: ComponentFixture<NhapkhokhacComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhokhacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhokhacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
