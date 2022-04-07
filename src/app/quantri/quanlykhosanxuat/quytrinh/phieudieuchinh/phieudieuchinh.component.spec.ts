import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhieudieuchinhComponent } from './phieudieuchinh.component';

describe('PhieudieuchinhComponent', () => {
  let component: PhieudieuchinhComponent;
  let fixture: ComponentFixture<PhieudieuchinhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieudieuchinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieudieuchinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
