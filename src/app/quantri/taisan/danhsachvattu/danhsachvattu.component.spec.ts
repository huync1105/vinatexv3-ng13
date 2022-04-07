import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhsachvattuComponent } from './danhsachvattu.component';

describe('DanhsachvattuComponent', () => {
  let component: DanhsachvattuComponent;
  let fixture: ComponentFixture<DanhsachvattuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
