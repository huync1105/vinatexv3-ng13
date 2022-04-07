import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmuctrangthaibaolanhComponent } from './danhmuctrangthaibaolanh.component';

describe('DanhmuctrangthaibaolanhComponent', () => {
  let component: DanhmuctrangthaibaolanhComponent;
  let fixture: ComponentFixture<DanhmuctrangthaibaolanhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctrangthaibaolanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctrangthaibaolanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
