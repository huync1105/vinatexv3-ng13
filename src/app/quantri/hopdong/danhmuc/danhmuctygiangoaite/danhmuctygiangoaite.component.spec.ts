import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmuctygiangoaiteComponent } from './danhmuctygiangoaite.component';

describe('DanhmuctygiangoaiteComponent', () => {
  let component: DanhmuctygiangoaiteComponent;
  let fixture: ComponentFixture<DanhmuctygiangoaiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctygiangoaiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctygiangoaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
