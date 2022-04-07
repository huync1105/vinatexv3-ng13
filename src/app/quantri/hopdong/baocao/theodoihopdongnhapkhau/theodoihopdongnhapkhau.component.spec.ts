import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TheodoihopdongnhapkhauComponent } from './theodoihopdongnhapkhau.component';

describe('TheodoihopdongnhapkhauComponent', () => {
  let component: TheodoihopdongnhapkhauComponent;
  let fixture: ComponentFixture<TheodoihopdongnhapkhauComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoihopdongnhapkhauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoihopdongnhapkhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
