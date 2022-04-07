import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HopdongvattuphumodalComponent } from './hopdongvattuphumodal.component';

describe('HopdongvattuphumodalComponent', () => {
  let component: HopdongvattuphumodalComponent;
  let fixture: ComponentFixture<HopdongvattuphumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
