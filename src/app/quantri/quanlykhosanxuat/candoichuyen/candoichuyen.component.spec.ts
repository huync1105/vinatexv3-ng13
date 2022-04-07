import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CandoichuyenComponent } from './candoichuyen.component';

describe('CandoichuyenComponent', () => {
  let component: CandoichuyenComponent;
  let fixture: ComponentFixture<CandoichuyenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandoichuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandoichuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
