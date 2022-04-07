import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LapkehoachlichxichnamComponent } from './lapkehoachlichxichnam.component';

describe('LapkehoachlichxichnamComponent', () => {
  let component: LapkehoachlichxichnamComponent;
  let fixture: ComponentFixture<LapkehoachlichxichnamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LapkehoachlichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapkehoachlichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
