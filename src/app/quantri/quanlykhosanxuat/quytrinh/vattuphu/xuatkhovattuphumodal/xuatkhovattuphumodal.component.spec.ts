import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhovattuphumodalComponent } from './xuatkhovattuphumodal.component';

describe('XuatkhovattuphumodalComponent', () => {
  let component: XuatkhovattuphumodalComponent;
  let fixture: ComponentFixture<XuatkhovattuphumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhovattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhovattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
