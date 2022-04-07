import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LobongComponent } from './lobong.component';

describe('LobongComponent', () => {
  let component: LobongComponent;
  let fixture: ComponentFixture<LobongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LobongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
