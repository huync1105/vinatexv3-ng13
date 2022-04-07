import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalluachontaisantheolichxichComponent } from './modalluachontaisantheolichxich.component';

describe('ModalluachontaisantheolichxichComponent', () => {
  let component: ModalluachontaisantheolichxichComponent;
  let fixture: ComponentFixture<ModalluachontaisantheolichxichComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalluachontaisantheolichxichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalluachontaisantheolichxichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
