import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmucphibanhangComponent } from './modaldanhmucphibanhang.component';

describe('ModaldanhmucphibanhangComponent', () => {
  let component: ModaldanhmucphibanhangComponent;
  let fixture: ComponentFixture<ModaldanhmucphibanhangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucphibanhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucphibanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
