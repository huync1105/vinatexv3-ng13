import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmuctrangthaibaolanhComponent } from './modaldanhmuctrangthaibaolanh.component';

describe('ModaldanhmuctrangthaibaolanhComponent', () => {
  let component: ModaldanhmuctrangthaibaolanhComponent;
  let fixture: ComponentFixture<ModaldanhmuctrangthaibaolanhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctrangthaibaolanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctrangthaibaolanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
