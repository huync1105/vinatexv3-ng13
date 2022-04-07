import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TrienkhaikehoachsanxuatmodalComponent } from './trienkhaikehoachsanxuatmodal.component';

describe('TrienkhaikehoachsanxuatmodalComponent', () => {
  let component: TrienkhaikehoachsanxuatmodalComponent;
  let fixture: ComponentFixture<TrienkhaikehoachsanxuatmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrienkhaikehoachsanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrienkhaikehoachsanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
