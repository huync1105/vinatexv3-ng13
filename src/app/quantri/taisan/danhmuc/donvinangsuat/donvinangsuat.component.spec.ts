import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DonvinangsuatComponent } from './donvinangsuat.component';

describe('DonvinangsuatComponent', () => {
  let component: DonvinangsuatComponent;
  let fixture: ComponentFixture<DonvinangsuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonvinangsuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonvinangsuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
