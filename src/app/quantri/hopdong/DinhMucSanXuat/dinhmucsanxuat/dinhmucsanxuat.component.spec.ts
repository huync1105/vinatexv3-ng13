import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DinhmucsanxuatComponent } from './dinhmucsanxuat.component';

describe('DinhmucsanxuatComponent', () => {
  let component: DinhmucsanxuatComponent;
  let fixture: ComponentFixture<DinhmucsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
