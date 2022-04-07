import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LichxichnamComponent } from './lichxichnam.component';

describe('LichxichnamComponent', () => {
  let component: LichxichnamComponent;
  let fixture: ComponentFixture<LichxichnamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
