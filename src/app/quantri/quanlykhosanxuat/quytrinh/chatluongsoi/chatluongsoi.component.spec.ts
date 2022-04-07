import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChatluongsoiComponent } from './chatluongsoi.component';

describe('ChatluongsoiComponent', () => {
  let component: ChatluongsoiComponent;
  let fixture: ComponentFixture<ChatluongsoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatluongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatluongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
