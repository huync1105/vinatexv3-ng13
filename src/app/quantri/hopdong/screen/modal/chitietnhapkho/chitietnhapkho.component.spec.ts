import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietnhapkhoComponent } from './chitietnhapkho.component';

describe('ChitietnhapkhoComponent', () => {
  let component: ChitietnhapkhoComponent;
  let fixture: ComponentFixture<ChitietnhapkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietnhapkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietnhapkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
