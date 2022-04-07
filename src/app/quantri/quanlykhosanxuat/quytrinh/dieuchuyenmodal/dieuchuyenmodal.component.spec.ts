import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DieuchuyenmodalComponent } from './dieuchuyenmodal.component';

describe('DieuchuyenmodalComponent', () => {
  let component: DieuchuyenmodalComponent;
  let fixture: ComponentFixture<DieuchuyenmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuchuyenmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuchuyenmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
