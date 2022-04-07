import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalluachontaisantheolichthangComponent } from './modalluachontaisantheolichthang.component';

describe('ModalluachontaisantheolichthangComponent', () => {
  let component: ModalluachontaisantheolichthangComponent;
  let fixture: ComponentFixture<ModalluachontaisantheolichthangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalluachontaisantheolichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalluachontaisantheolichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
