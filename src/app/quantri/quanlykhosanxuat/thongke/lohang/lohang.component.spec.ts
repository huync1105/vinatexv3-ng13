import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LohangComponent } from './lohang.component';

describe('LohangComponent', () => {
  let component: LohangComponent;
  let fixture: ComponentFixture<LohangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LohangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
