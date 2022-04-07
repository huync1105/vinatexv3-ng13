import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChiphibongComponent } from './chiphibong.component';

describe('ChiphibongComponent', () => {
  let component: ChiphibongComponent;
  let fixture: ComponentFixture<ChiphibongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphibongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphibongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
