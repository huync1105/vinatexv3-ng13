import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DinhmuctieuchichatluongsoiComponent } from './dinhmuctieuchichatluongsoi.component';

describe('DinhmuctieuchichatluongsoiComponent', () => {
  let component: DinhmuctieuchichatluongsoiComponent;
  let fixture: ComponentFixture<DinhmuctieuchichatluongsoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmuctieuchichatluongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmuctieuchichatluongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
