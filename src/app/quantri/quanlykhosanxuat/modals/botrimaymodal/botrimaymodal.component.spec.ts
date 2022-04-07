import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BotrimaymodalComponent } from './botrimaymodal.component';

describe('BotrimaymodalComponent', () => {
  let component: BotrimaymodalComponent;
  let fixture: ComponentFixture<BotrimaymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotrimaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotrimaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
