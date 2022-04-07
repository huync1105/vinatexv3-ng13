import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TrienkhaikehoachsanxuatComponent } from './trienkhaikehoachsanxuat.component';

describe('TrienkhaikehoachsanxuatComponent', () => {
  let component: TrienkhaikehoachsanxuatComponent;
  let fixture: ComponentFixture<TrienkhaikehoachsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrienkhaikehoachsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrienkhaikehoachsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
