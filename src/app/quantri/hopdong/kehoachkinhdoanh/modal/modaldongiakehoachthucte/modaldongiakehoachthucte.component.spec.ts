import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldongiakehoachthucteComponent } from './modaldongiakehoachthucte.component';

describe('ModaldongiakehoachthucteComponent', () => {
  let component: ModaldongiakehoachthucteComponent;
  let fixture: ComponentFixture<ModaldongiakehoachthucteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldongiakehoachthucteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldongiakehoachthucteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
