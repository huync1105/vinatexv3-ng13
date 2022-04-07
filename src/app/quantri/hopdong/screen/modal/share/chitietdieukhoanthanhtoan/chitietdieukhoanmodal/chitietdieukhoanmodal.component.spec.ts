import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietdieukhoanmodalComponent } from './chitietdieukhoanmodal.component';

describe('ChitietdieukhoanmodalComponent', () => {
  let component: ChitietdieukhoanmodalComponent;
  let fixture: ComponentFixture<ChitietdieukhoanmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietdieukhoanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietdieukhoanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
