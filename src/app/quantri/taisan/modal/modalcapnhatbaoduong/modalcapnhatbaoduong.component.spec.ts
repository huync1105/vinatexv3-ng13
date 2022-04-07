import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalcapnhatbaoduongComponent } from './modalcapnhatbaoduong.component';

describe('ModalcapnhatbaoduongComponent', () => {
  let component: ModalcapnhatbaoduongComponent;
  let fixture: ComponentFixture<ModalcapnhatbaoduongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhatbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhatbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
