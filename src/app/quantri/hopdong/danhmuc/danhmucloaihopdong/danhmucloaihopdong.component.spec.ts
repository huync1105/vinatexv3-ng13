import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucloaihopdongComponent } from './danhmucloaihopdong.component';

describe('DanhmucloaihopdongComponent', () => {
  let component: DanhmucloaihopdongComponent;
  let fixture: ComponentFixture<DanhmucloaihopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaihopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaihopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
