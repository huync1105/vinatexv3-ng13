import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldonvinangsuatComponent } from './modaldonvinangsuat.component';

describe('ModaldonvinangsuatComponent', () => {
  let component: ModaldonvinangsuatComponent;
  let fixture: ComponentFixture<ModaldonvinangsuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldonvinangsuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldonvinangsuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
