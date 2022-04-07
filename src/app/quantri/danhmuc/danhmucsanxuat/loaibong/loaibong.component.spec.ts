import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LoaibongComponent } from './loaibong.component';

describe('LoaibongComponent', () => {
  let component: LoaibongComponent;
  let fixture: ComponentFixture<LoaibongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaibongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaibongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
