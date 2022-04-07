import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhancongComponent } from './nhancong.component';

describe('NhancongComponent', () => {
  let component: NhancongComponent;
  let fixture: ComponentFixture<NhancongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhancongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhancongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
