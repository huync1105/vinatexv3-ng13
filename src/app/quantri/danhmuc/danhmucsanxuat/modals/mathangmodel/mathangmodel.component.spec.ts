import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { MathangmodelComponent } from './mathangmodel.component';

describe('MathangmodelComponent', () => {
  let component: MathangmodelComponent;
  let fixture: ComponentFixture<MathangmodelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MathangmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathangmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
