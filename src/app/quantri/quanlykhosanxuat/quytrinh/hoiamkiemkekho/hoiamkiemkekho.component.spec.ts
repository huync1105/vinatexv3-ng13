import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HoiamkiemkekhoComponent } from './hoiamkiemkekho.component';

describe('HoiamkiemkekhoComponent', () => {
  let component: HoiamkiemkekhoComponent;
  let fixture: ComponentFixture<HoiamkiemkekhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiamkiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiamkiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
