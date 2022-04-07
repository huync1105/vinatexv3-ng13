import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PhieudieuchinhmodalComponent } from './phieudieuchinhmodal.component';

describe('PhieudieuchinhmodalComponent', () => {
  let component: PhieudieuchinhmodalComponent;
  let fixture: ComponentFixture<PhieudieuchinhmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieudieuchinhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieudieuchinhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
