import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietnhansuthuchienComponent } from './chitietnhansuthuchien.component';

describe('ChitietnhansuthuchienComponent', () => {
  let component: ChitietnhansuthuchienComponent;
  let fixture: ComponentFixture<ChitietnhansuthuchienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietnhansuthuchienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietnhansuthuchienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
