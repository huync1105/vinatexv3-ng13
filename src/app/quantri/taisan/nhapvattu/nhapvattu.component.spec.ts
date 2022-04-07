import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapvattuComponent } from './nhapvattu.component';

describe('NhapvattuComponent', () => {
  let component: NhapvattuComponent;
  let fixture: ComponentFixture<NhapvattuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
