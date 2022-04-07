import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalloaikhauhaoComponent } from './modalloaikhauhao.component';

describe('ModalloaikhauhaoComponent', () => {
  let component: ModalloaikhauhaoComponent;
  let fixture: ComponentFixture<ModalloaikhauhaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaikhauhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaikhauhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
