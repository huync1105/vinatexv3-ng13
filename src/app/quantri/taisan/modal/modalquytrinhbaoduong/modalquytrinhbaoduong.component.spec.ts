import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalquytrinhbaoduongComponent } from './modalquytrinhbaoduong.component';

describe('ModalquytrinhbaoduongComponent', () => {
  let component: ModalquytrinhbaoduongComponent;
  let fixture: ComponentFixture<ModalquytrinhbaoduongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalquytrinhbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalquytrinhbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
