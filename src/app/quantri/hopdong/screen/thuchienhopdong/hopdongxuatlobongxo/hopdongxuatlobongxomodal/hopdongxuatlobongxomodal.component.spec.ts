import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HopdongxuatlobongxomodalComponent } from './hopdongxuatlobongxomodal.component';

describe('HopdongxuatlobongxomodalComponent', () => {
  let component: HopdongxuatlobongxomodalComponent;
  let fixture: ComponentFixture<HopdongxuatlobongxomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongxuatlobongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongxuatlobongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
