import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CalcmodalComponent } from './calcmodal.component';

describe('CalcmodalComponent', () => {
  let component: CalcmodalComponent;
  let fixture: ComponentFixture<CalcmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
