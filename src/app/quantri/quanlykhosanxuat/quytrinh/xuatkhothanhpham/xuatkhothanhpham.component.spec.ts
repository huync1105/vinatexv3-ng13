import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhothanhphamComponent } from './xuatkhothanhpham.component';

describe('XuatkhothanhphamComponent', () => {
  let component: XuatkhothanhphamComponent;
  let fixture: ComponentFixture<XuatkhothanhphamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhothanhphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhothanhphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
