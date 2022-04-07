import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LohangmodalComponent } from './lohangmodal.component';

describe('LohangmodalComponent', () => {
  let component: LohangmodalComponent;
  let fixture: ComponentFixture<LohangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LohangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LohangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
