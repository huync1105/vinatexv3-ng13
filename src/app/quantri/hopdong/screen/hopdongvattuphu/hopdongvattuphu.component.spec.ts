import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HopdongvattuphuComponent } from './hopdongvattuphu.component';

describe('HopdongvattuphuComponent', () => {
  let component: HopdongvattuphuComponent;
  let fixture: ComponentFixture<HopdongvattuphuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
