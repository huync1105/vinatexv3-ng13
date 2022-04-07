import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachhopdongsoimodalComponent } from './danhsachhopdongsoimodal.component';

describe('DanhsachhopdongsoimodalComponent', () => {
  let component: DanhsachhopdongsoimodalComponent;
  let fixture: ComponentFixture<DanhsachhopdongsoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
