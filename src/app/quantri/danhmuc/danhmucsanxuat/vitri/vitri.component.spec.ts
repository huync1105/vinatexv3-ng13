import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VitriComponent } from './vitri.component';

describe('VitriComponent', () => {
  let component: VitriComponent;
  let fixture: ComponentFixture<VitriComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VitriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
