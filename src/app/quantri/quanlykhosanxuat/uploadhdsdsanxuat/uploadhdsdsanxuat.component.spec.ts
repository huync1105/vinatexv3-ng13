import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { UploadhdsdsanxuatComponent } from './uploadhdsdsanxuat.component';

describe('UploadhdsdsanxuatComponent', () => {
  let component: UploadhdsdsanxuatComponent;
  let fixture: ComponentFixture<UploadhdsdsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadhdsdsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadhdsdsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
