import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BotrimayOngComponent } from './botrimay-ong.component';

describe('BotrimayOngComponent', () => {
  let component: BotrimayOngComponent;
  let fixture: ComponentFixture<BotrimayOngComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotrimayOngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotrimayOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
