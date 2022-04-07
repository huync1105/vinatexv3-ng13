import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TrangthaimaysanxuatComponent } from './trangthaimaysanxuat.component';

describe('TrangthaimaysanxuatComponent', () => {
  let component: TrangthaimaysanxuatComponent;
  let fixture: ComponentFixture<TrangthaimaysanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangthaimaysanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangthaimaysanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
