import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiahanhopdongmodalComponent } from './giahanhopdongmodal.component';

describe('GiahanhopdongmodalComponent', () => {
  let component: GiahanhopdongmodalComponent;
  let fixture: ComponentFixture<GiahanhopdongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiahanhopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiahanhopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
