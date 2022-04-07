import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TraoDoiComponent } from './trao-doi.component';

describe('TraoDoiComponent', () => {
  let component: TraoDoiComponent;
  let fixture: ComponentFixture<TraoDoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TraoDoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraoDoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
