import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalbaoduongluachontaisanComponent } from './modalbaoduongluachontaisan.component';

describe('ModalbaoduongluachontaisanComponent', () => {
  let component: ModalbaoduongluachontaisanComponent;
  let fixture: ComponentFixture<ModalbaoduongluachontaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbaoduongluachontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbaoduongluachontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
