import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhothanhphamhopdongComponent } from './xuatkhothanhphamhopdong.component';

describe('XuatkhothanhphamhopdongComponent', () => {
  let component: XuatkhothanhphamhopdongComponent;
  let fixture: ComponentFixture<XuatkhothanhphamhopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhothanhphamhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhothanhphamhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
