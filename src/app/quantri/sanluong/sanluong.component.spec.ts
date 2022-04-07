import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { SanluongComponent } from './sanluong.component';

describe('SanluongComponent', () => {
  let component: SanluongComponent;
  let fixture: ComponentFixture<SanluongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SanluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
