import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TinhdoanhthumodalComponent } from './tinhdoanhthumodal.component';

describe('TinhdoanhthumodalComponent', () => {
  let component: TinhdoanhthumodalComponent;
  let fixture: ComponentFixture<TinhdoanhthumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhdoanhthumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhdoanhthumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
