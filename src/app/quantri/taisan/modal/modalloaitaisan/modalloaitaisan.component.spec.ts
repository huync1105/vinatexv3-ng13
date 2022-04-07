import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalloaitaisanComponent } from './modalloaitaisan.component';

describe('ModalloaitaisanComponent', () => {
  let component: ModalloaitaisanComponent;
  let fixture: ComponentFixture<ModalloaitaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
