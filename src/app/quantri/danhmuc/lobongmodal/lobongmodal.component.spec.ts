import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LobongmodalComponent } from './lobongmodal.component';

describe('LobongmodalComponent', () => {
  let component: LobongmodalComponent;
  let fixture: ComponentFixture<LobongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LobongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
