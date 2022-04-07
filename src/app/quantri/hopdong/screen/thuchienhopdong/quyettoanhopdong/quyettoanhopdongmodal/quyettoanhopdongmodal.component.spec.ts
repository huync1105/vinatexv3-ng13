import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuyettoanhopdongmodalComponent } from './quyettoanhopdongmodal.component';

describe('QuyettoanhopdongmodalComponent', () => {
  let component: QuyettoanhopdongmodalComponent;
  let fixture: ComponentFixture<QuyettoanhopdongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyettoanhopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyettoanhopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
