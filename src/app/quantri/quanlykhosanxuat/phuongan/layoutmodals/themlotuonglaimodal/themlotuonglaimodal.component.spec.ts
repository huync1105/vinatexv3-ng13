import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThemlotuonglaimodalComponent } from './themlotuonglaimodal.component';

describe('ThemlotuonglaimodalComponent', () => {
  let component: ThemlotuonglaimodalComponent;
  let fixture: ComponentFixture<ThemlotuonglaimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemlotuonglaimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemlotuonglaimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
