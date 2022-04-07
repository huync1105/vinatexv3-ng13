import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatbongchovayComponent } from './xuatbongchovay.component';

describe('XuatbongchovayComponent', () => {
  let component: XuatbongchovayComponent;
  let fixture: ComponentFixture<XuatbongchovayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatbongchovayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatbongchovayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
