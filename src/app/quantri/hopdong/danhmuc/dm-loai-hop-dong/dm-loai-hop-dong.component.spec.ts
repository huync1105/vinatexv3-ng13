import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmLoaiHopDongComponent } from './dm-loai-hop-dong.component';

describe('DmLoaiHopDongComponent', () => {
  let component: DmLoaiHopDongComponent;
  let fixture: ComponentFixture<DmLoaiHopDongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmLoaiHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmLoaiHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
