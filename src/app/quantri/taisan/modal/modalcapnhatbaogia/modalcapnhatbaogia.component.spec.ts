import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalcapnhatbaogiaComponent } from './modalcapnhatbaogia.component';

describe('ModalcapnhatbaogiaComponent', () => {
  let component: ModalcapnhatbaogiaComponent;
  let fixture: ComponentFixture<ModalcapnhatbaogiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhatbaogiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhatbaogiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
