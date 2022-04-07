import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LoaidienkvComponent } from './loaidienkv.component';

describe('LoaidienkvComponent', () => {
  let component: LoaidienkvComponent;
  let fixture: ComponentFixture<LoaidienkvComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaidienkvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaidienkvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
