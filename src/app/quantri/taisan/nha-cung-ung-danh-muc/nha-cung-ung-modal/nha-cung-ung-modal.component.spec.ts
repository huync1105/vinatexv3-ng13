import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhaCungUngModalComponent } from './nha-cung-ung-modal.component';

describe('NhaCungUngModalComponent', () => {
  let component: NhaCungUngModalComponent;
  let fixture: ComponentFixture<NhaCungUngModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaCungUngModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaCungUngModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
