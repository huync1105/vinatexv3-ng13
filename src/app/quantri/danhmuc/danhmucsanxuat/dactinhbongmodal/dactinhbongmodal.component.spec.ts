import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DactinhbongmodalComponent } from './dactinhbongmodal.component';

describe('DactinhbongmodalComponent', () => {
  let component: DactinhbongmodalComponent;
  let fixture: ComponentFixture<DactinhbongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DactinhbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DactinhbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
