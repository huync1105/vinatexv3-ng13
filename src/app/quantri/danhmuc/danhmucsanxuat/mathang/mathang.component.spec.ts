import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { MathangComponent } from './mathang.component';

describe('MathangComponent', () => {
  let component: MathangComponent;
  let fixture: ComponentFixture<MathangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
