import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhauHaoTaiSanModalComponent } from './khau-hao-tai-san-modal.component';

describe('KhauHaoTaiSanModalComponent', () => {
  let component: KhauHaoTaiSanModalComponent;
  let fixture: ComponentFixture<KhauHaoTaiSanModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhauHaoTaiSanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhauHaoTaiSanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
