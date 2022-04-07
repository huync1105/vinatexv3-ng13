import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChatluongsoimathangmodalComponent } from './chatluongsoimathangmodal.component';

describe('ChatluongsoimathangmodalComponent', () => {
  let component: ChatluongsoimathangmodalComponent;
  let fixture: ComponentFixture<ChatluongsoimathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatluongsoimathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatluongsoimathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
