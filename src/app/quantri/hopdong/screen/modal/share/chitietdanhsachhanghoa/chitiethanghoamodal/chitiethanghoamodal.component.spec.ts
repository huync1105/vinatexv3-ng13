import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal.component';

describe('ChitiethanghoamodalComponent', () => {
  let component: ChitiethanghoamodalComponent;
  let fixture: ComponentFixture<ChitiethanghoamodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiethanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiethanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
