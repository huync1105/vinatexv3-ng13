import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmucloaihopdongComponent } from './modaldanhmucloaihopdong.component';

describe('ModaldanhmucloaihopdongComponent', () => {
  let component: ModaldanhmucloaihopdongComponent;
  let fixture: ComponentFixture<ModaldanhmucloaihopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucloaihopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucloaihopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
