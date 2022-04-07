import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatbongchovaymodalComponent } from './xuatbongchovaymodal.component';

describe('XuatbongchovaymodalComponent', () => {
  let component: XuatbongchovaymodalComponent;
  let fixture: ComponentFixture<XuatbongchovaymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatbongchovaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatbongchovaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
