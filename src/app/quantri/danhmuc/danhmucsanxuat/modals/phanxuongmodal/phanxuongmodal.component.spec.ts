import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhanxuongmodalComponent } from './phanxuongmodal.component';

describe('PhanxuongmodalComponent', () => {
  let component: PhanxuongmodalComponent;
  let fixture: ComponentFixture<PhanxuongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanxuongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanxuongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
