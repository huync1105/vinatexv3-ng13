import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmuctinhluongComponent } from './modaldanhmuctinhluong.component';

describe('ModaldanhmuctinhluongComponent', () => {
  let component: ModaldanhmuctinhluongComponent;
  let fixture: ComponentFixture<ModaldanhmuctinhluongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctinhluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctinhluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
