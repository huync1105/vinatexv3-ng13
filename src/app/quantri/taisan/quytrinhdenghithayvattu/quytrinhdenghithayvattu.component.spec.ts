import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuytrinhdenghithayvattuComponent } from './quytrinhdenghithayvattu.component';

describe('QuytrinhdenghithayvattuComponent', () => {
  let component: QuytrinhdenghithayvattuComponent;
  let fixture: ComponentFixture<QuytrinhdenghithayvattuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhdenghithayvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhdenghithayvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
