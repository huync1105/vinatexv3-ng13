import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VattucanthayComponent } from './vattucanthay.component';

describe('VattucanthayComponent', () => {
  let component: VattucanthayComponent;
  let fixture: ComponentFixture<VattucanthayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VattucanthayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattucanthayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
