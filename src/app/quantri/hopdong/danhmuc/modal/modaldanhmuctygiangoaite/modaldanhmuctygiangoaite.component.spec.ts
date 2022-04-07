import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmuctygiangoaiteComponent } from './modaldanhmuctygiangoaite.component';

describe('ModaldanhmuctygiangoaiteComponent', () => {
  let component: ModaldanhmuctygiangoaiteComponent;
  let fixture: ComponentFixture<ModaldanhmuctygiangoaiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctygiangoaiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctygiangoaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
