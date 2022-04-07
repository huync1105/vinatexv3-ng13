import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { MathangdaomodalComponent } from './mathangdaomodal.component';

describe('MathangdaomodalComponent', () => {
  let component: MathangdaomodalComponent;
  let fixture: ComponentFixture<MathangdaomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MathangdaomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathangdaomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
