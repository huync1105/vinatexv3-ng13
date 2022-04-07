import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { MucluongcocaunhansuComponent } from './mucluongcocaunhansu.component';

describe('MucluongcocaunhansuComponent', () => {
  let component: MucluongcocaunhansuComponent;
  let fixture: ComponentFixture<MucluongcocaunhansuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MucluongcocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MucluongcocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
