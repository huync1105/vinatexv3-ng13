import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietphathopdongComponent } from './chitietphathopdong.component';

describe('ChitietphathopdongComponent', () => {
  let component: ChitietphathopdongComponent;
  let fixture: ComponentFixture<ChitietphathopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietphathopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietphathopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
