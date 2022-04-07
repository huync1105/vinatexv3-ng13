import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HacapComponent } from './hacap.component';

describe('HacapComponent', () => {
  let component: HacapComponent;
  let fixture: ComponentFixture<HacapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HacapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
