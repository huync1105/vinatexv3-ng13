import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongtinchungComponent } from './thongtinchung.component';

describe('ThongtinchungComponent', () => {
  let component: ThongtinchungComponent;
  let fixture: ComponentFixture<ThongtinchungComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinchungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
