import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LoxomodalComponent } from './loxomodal.component';

describe('LoxomodalComponent', () => {
  let component: LoxomodalComponent;
  let fixture: ComponentFixture<LoxomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
