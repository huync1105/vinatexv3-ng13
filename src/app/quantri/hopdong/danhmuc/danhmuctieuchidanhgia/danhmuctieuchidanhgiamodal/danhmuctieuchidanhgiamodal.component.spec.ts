import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmuctieuchidanhgiamodalComponent } from './danhmuctieuchidanhgiamodal.component';

describe('DanhmuctieuchidanhgiamodalComponent', () => {
  let component: DanhmuctieuchidanhgiamodalComponent;
  let fixture: ComponentFixture<DanhmuctieuchidanhgiamodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctieuchidanhgiamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctieuchidanhgiamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
