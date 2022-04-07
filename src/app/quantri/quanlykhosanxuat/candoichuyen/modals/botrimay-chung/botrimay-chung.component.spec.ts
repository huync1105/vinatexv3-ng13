import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BotrimayChungComponent } from './botrimay-chung.component';

describe('BotrimayChungComponent', () => {
  let component: BotrimayChungComponent;
  let fixture: ComponentFixture<BotrimayChungComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotrimayChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotrimayChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
