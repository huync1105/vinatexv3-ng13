import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DoanhthuComponent } from './doanhthu.component';

describe('DoanhthuComponent', () => {
  let component: DoanhthuComponent;
  let fixture: ComponentFixture<DoanhthuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoanhthuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhthuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
