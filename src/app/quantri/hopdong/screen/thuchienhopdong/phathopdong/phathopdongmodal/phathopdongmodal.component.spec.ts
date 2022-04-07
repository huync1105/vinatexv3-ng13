import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhathopdongmodalComponent } from './phathopdongmodal.component';

describe('PhathopdongmodalComponent', () => {
  let component: PhathopdongmodalComponent;
  let fixture: ComponentFixture<PhathopdongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhathopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhathopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
