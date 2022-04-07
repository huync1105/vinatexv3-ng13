import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachmaymodalComponent } from './danhsachmaymodal.component';

describe('DanhsachmaymodalComponent', () => {
  let component: DanhsachmaymodalComponent;
  let fixture: ComponentFixture<DanhsachmaymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachmaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachmaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
