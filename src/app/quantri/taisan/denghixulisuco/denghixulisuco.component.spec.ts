import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DenghixulisucoComponent } from './denghixulisuco.component';

describe('DenghixulisucoComponent', () => {
  let component: DenghixulisucoComponent;
  let fixture: ComponentFixture<DenghixulisucoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghixulisucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghixulisucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
