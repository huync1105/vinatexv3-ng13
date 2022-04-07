import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalthongbaoComponent } from './modalthongbao.component';

describe('ModalthongbaoComponent', () => {
  let component: ModalthongbaoComponent;
  let fixture: ComponentFixture<ModalthongbaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthongbaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthongbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
