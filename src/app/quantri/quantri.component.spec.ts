import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuantriComponent } from './quantri.component';

describe('QuantriComponent', () => {
  let component: QuantriComponent;
  let fixture: ComponentFixture<QuantriComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
