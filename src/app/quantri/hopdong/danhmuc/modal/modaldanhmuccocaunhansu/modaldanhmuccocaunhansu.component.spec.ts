import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmuccocaunhansuComponent } from './modaldanhmuccocaunhansu.component';

describe('ModaldanhmuccocaunhansuComponent', () => {
  let component: ModaldanhmuccocaunhansuComponent;
  let fixture: ComponentFixture<ModaldanhmuccocaunhansuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuccocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuccocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
