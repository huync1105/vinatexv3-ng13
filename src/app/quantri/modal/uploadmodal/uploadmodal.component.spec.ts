import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { UploadmodalComponent } from './uploadmodal.component';

describe('UploadmodalComponent', () => {
  let component: UploadmodalComponent;
  let fixture: ComponentFixture<UploadmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
