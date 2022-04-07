import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuyettoanhopdongComponent } from './quyettoanhopdong.component';

describe('QuyettoanhopdongComponent', () => {
  let component: QuyettoanhopdongComponent;
  let fixture: ComponentFixture<QuyettoanhopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyettoanhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyettoanhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
