import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalthongtinchitiettaisanComponent } from './modalthongtinchitiettaisan.component';

describe('ModalthongtinchitiettaisanComponent', () => {
  let component: ModalthongtinchitiettaisanComponent;
  let fixture: ComponentFixture<ModalthongtinchitiettaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthongtinchitiettaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthongtinchitiettaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
