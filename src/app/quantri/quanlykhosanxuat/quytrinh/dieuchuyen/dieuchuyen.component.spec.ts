import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DieuchuyenComponent } from './dieuchuyen.component';

describe('DieuchuyenComponent', () => {
  let component: DieuchuyenComponent;
  let fixture: ComponentFixture<DieuchuyenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuchuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuchuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
