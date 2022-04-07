import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalchontaisanComponent } from './modalchontaisan.component';

describe('ModalchontaisanComponent', () => {
  let component: ModalchontaisanComponent;
  let fixture: ComponentFixture<ModalchontaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
