import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldonvitinhComponent } from './modaldonvitinh.component';

describe('ModaldonvitinhComponent', () => {
  let component: ModaldonvitinhComponent;
  let fixture: ComponentFixture<ModaldonvitinhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldonvitinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldonvitinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
