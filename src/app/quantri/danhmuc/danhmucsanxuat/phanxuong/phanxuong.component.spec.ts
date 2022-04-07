import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhanxuongComponent } from './phanxuong.component';

describe('PhanxuongComponent', () => {
  let component: PhanxuongComponent;
  let fixture: ComponentFixture<PhanxuongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanxuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanxuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
