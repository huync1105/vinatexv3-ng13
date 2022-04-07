import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmuctieuchidanhgiaComponent } from './danhmuctieuchidanhgia.component';

describe('DanhmuctieuchidanhgiaComponent', () => {
  let component: DanhmuctieuchidanhgiaComponent;
  let fixture: ComponentFixture<DanhmuctieuchidanhgiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctieuchidanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctieuchidanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
