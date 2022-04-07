import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalbaoduongComponent } from './modalbaoduong.component';

describe('ModalbaoduongComponent', () => {
  let component: ModalbaoduongComponent;
  let fixture: ComponentFixture<ModalbaoduongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
