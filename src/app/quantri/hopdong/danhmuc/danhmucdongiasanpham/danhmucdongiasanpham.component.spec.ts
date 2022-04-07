import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucdongiasanphamComponent } from './danhmucdongiasanpham.component';

describe('DanhmucdongiasanphamComponent', () => {
  let component: DanhmucdongiasanphamComponent;
  let fixture: ComponentFixture<DanhmucdongiasanphamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucdongiasanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucdongiasanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
