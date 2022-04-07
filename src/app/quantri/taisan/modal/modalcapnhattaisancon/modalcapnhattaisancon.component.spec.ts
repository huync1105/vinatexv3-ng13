import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalcapnhattaisanconComponent } from './modalcapnhattaisancon.component';

describe('ModalcapnhattaisanconComponent', () => {
  let component: ModalcapnhattaisanconComponent;
  let fixture: ComponentFixture<ModalcapnhattaisanconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhattaisanconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhattaisanconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
