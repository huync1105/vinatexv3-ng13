import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThemNhaCungUngModalComponent } from './them-nha-cung-ung-modal.component';

describe('ThemNhaCungUngModalComponent', () => {
  let component: ThemNhaCungUngModalComponent;
  let fixture: ComponentFixture<ThemNhaCungUngModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemNhaCungUngModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemNhaCungUngModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
