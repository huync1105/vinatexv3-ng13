import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { SanluongtonghopComponent } from './sanluongtonghop.component';

describe('SanluongtonghopComponent', () => {
  let component: SanluongtonghopComponent;
  let fixture: ComponentFixture<SanluongtonghopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SanluongtonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanluongtonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
