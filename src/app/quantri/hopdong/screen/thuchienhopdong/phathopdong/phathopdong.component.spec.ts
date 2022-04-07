import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhathopdongComponent } from './phathopdong.component';

describe('PhathopdongComponent', () => {
  let component: PhathopdongComponent;
  let fixture: ComponentFixture<PhathopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhathopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhathopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
