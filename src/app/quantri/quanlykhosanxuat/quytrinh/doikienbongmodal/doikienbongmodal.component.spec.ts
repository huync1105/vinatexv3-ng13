import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DoikienbongmodalComponent } from './doikienbongmodal.component';

describe('DoikienbongmodalComponent', () => {
  let component: DoikienbongmodalComponent;
  let fixture: ComponentFixture<DoikienbongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoikienbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoikienbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
