import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldenghixulisucoComponent } from './modaldenghixulisuco.component';

describe('ModaldenghixulisucoComponent', () => {
  let component: ModaldenghixulisucoComponent;
  let fixture: ComponentFixture<ModaldenghixulisucoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldenghixulisucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldenghixulisucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
