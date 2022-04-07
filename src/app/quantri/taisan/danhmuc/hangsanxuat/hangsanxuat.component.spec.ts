import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HangsanxuatComponent } from './hangsanxuat.component';

describe('HangsanxuatComponent', () => {
  let component: HangsanxuatComponent;
  let fixture: ComponentFixture<HangsanxuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HangsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
