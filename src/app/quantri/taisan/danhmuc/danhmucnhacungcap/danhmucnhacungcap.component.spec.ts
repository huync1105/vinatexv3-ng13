import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucnhacungcapComponent } from './danhmucnhacungcap.component';

describe('DanhmucnhacungcapComponent', () => {
  let component: DanhmucnhacungcapComponent;
  let fixture: ComponentFixture<DanhmucnhacungcapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucnhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
