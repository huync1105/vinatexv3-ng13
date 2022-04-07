import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GiaonhanhanghoamodalComponent } from './giaonhanhanghoamodal.component';

describe('GiaonhanhanghoamodalComponent', () => {
  let component: GiaonhanhanghoamodalComponent;
  let fixture: ComponentFixture<GiaonhanhanghoamodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaonhanhanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaonhanhanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
