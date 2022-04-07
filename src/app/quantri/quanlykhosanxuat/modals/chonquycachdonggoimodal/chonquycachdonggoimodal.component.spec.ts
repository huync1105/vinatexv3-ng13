import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonquycachdonggoimodalComponent } from './chonquycachdonggoimodal.component';

describe('ChonquycachdonggoimodalComponent', () => {
  let component: ChonquycachdonggoimodalComponent;
  let fixture: ComponentFixture<ChonquycachdonggoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonquycachdonggoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonquycachdonggoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
