import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CasanxuatComponent } from './casanxuat.component';

describe('CasanxuatComponent', () => {
  let component: CasanxuatComponent;
  let fixture: ComponentFixture<CasanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CasanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
