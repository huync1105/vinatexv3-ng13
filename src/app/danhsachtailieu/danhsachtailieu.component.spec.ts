import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachtailieuComponent } from './danhsachtailieu.component';

describe('DanhsachtailieuComponent', () => {
  let component: DanhsachtailieuComponent;
  let fixture: ComponentFixture<DanhsachtailieuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtailieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtailieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
