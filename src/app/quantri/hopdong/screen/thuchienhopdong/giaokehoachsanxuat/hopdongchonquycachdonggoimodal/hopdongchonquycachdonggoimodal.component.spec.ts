import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HopdongchonquycachdonggoimodalComponent } from './hopdongchonquycachdonggoimodal.component';

describe('HopdongchonquycachdonggoimodalComponent', () => {
  let component: HopdongchonquycachdonggoimodalComponent;
  let fixture: ComponentFixture<HopdongchonquycachdonggoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongchonquycachdonggoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongchonquycachdonggoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
