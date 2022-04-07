import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LoaisoiComponent } from './loaisoi.component';

describe('LoaisoiComponent', () => {
  let component: LoaisoiComponent;
  let fixture: ComponentFixture<LoaisoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaisoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaisoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
