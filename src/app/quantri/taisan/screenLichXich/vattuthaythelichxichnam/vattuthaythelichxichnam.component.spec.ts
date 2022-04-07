import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VattuthaythelichxichnamComponent } from './vattuthaythelichxichnam.component';

describe('VattuthaythelichxichnamComponent', () => {
  let component: VattuthaythelichxichnamComponent;
  let fixture: ComponentFixture<VattuthaythelichxichnamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VattuthaythelichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattuthaythelichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
