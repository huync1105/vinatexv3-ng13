import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { SanluongchitietComponent } from './sanluongchitiet.component';

describe('SanluongchitietComponent', () => {
  let component: SanluongchitietComponent;
  let fixture: ComponentFixture<SanluongchitietComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SanluongchitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanluongchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
