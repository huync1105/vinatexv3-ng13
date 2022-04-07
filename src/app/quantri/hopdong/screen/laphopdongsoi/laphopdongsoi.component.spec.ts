import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LaphopdongsoiComponent } from './laphopdongsoi.component';

describe('LaphopdongsoiComponent', () => {
  let component: LaphopdongsoiComponent;
  let fixture: ComponentFixture<LaphopdongsoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LaphopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaphopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
