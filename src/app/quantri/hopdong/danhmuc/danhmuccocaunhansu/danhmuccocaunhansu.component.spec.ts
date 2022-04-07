import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmuccocaunhansuComponent } from './danhmuccocaunhansu.component';

describe('DanhmuccocaunhansuComponent', () => {
  let component: DanhmuccocaunhansuComponent;
  let fixture: ComponentFixture<DanhmuccocaunhansuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuccocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuccocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
