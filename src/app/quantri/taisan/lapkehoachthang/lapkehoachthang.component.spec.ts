import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LapkehoachthangComponent } from './lapkehoachthang.component';

describe('LapkehoachthangComponent', () => {
  let component: LapkehoachthangComponent;
  let fixture: ComponentFixture<LapkehoachthangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LapkehoachthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapkehoachthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
