import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachhopdongsoiComponent } from './danhsachhopdongsoi.component';

describe('DanhsachhopdongsoiComponent', () => {
  let component: DanhsachhopdongsoiComponent;
  let fixture: ComponentFixture<DanhsachhopdongsoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
