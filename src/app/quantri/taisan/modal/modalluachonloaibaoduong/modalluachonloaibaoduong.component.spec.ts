import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalluachonloaibaoduongComponent } from './modalluachonloaibaoduong.component';

describe('ModalluachonloaibaoduongComponent', () => {
  let component: ModalluachonloaibaoduongComponent;
  let fixture: ComponentFixture<ModalluachonloaibaoduongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalluachonloaibaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalluachonloaibaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
