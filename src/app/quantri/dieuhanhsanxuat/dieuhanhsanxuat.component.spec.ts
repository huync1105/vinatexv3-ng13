import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat.component';

describe('DieuhanhsanxuatComponent', () => {
  let component: DieuhanhsanxuatComponent;
  let fixture: ComponentFixture<DieuhanhsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuhanhsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuhanhsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
