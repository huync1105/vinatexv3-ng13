import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalthemmoiluachontaisanComponent } from './modalthemmoiluachontaisan.component';

describe('ModalthemmoiluachontaisanComponent', () => {
  let component: ModalthemmoiluachontaisanComponent;
  let fixture: ComponentFixture<ModalthemmoiluachontaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthemmoiluachontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthemmoiluachontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
