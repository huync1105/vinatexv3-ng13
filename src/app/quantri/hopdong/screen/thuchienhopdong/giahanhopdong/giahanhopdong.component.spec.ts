import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiahanhopdongComponent } from './giahanhopdong.component';

describe('GiahanhopdongComponent', () => {
  let component: GiahanhopdongComponent;
  let fixture: ComponentFixture<GiahanhopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiahanhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiahanhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
