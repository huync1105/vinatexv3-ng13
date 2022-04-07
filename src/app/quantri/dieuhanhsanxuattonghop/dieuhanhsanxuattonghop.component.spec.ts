import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DieuhanhsanxuattonghopComponent } from './dieuhanhsanxuattonghop.component';

describe('DieuhanhsanxuattonghopComponent', () => {
  let component: DieuhanhsanxuattonghopComponent;
  let fixture: ComponentFixture<DieuhanhsanxuattonghopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuhanhsanxuattonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuhanhsanxuattonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
