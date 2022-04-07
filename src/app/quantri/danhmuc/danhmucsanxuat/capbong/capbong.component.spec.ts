import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CapbongComponent } from './capbong.component';

describe('CapbongComponent', () => {
  let component: CapbongComponent;
  let fixture: ComponentFixture<CapbongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CapbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
