import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CandoitonComponent } from './candoiton.component';

describe('CandoitonComponent', () => {
  let component: CandoitonComponent;
  let fixture: ComponentFixture<CandoitonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandoitonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandoitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
