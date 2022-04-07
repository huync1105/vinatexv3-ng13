import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalcapnhattaisanComponent } from './modalcapnhattaisan.component';

describe('ModalcapnhattaisanComponent', () => {
  let component: ModalcapnhattaisanComponent;
  let fixture: ComponentFixture<ModalcapnhattaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhattaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhattaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
