import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhabongComponent } from './phabong.component';

describe('PhabongComponent', () => {
  let component: PhabongComponent;
  let fixture: ComponentFixture<PhabongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhabongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhabongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
