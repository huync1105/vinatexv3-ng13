import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TinhtrangtaisanComponent } from './tinhtrangtaisan.component';

describe('TinhtrangtaisanComponent', () => {
  let component: TinhtrangtaisanComponent;
  let fixture: ComponentFixture<TinhtrangtaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhtrangtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhtrangtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
