import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VattuComponent } from './vattu.component';

describe('VattuComponent', () => {
  let component: VattuComponent;
  let fixture: ComponentFixture<VattuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
