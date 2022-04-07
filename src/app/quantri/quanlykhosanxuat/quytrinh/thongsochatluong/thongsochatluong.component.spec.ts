import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongsochatluongComponent } from './thongsochatluong.component';

describe('ThongsochatluongComponent', () => {
  let component: ThongsochatluongComponent;
  let fixture: ComponentFixture<ThongsochatluongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongsochatluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongsochatluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
