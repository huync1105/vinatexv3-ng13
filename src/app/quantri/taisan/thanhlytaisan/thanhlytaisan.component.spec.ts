import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThanhlytaisanComponent } from './thanhlytaisan.component';

describe('ThanhlytaisanComponent', () => {
  let component: ThanhlytaisanComponent;
  let fixture: ComponentFixture<ThanhlytaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhlytaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhlytaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
