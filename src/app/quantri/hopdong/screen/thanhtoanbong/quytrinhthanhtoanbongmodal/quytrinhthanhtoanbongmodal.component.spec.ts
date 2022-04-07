import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuytrinhthanhtoanbongmodalComponent } from './quytrinhthanhtoanbongmodal.component';

describe('QuytrinhthanhtoanbongmodalComponent', () => {
  let component: QuytrinhthanhtoanbongmodalComponent;
  let fixture: ComponentFixture<QuytrinhthanhtoanbongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhthanhtoanbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhthanhtoanbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
