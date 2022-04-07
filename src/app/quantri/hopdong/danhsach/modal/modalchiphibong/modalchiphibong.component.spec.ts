import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalchiphibongComponent } from './modalchiphibong.component';

describe('ModalchiphibongComponent', () => {
  let component: ModalchiphibongComponent;
  let fixture: ComponentFixture<ModalchiphibongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchiphibongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchiphibongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
