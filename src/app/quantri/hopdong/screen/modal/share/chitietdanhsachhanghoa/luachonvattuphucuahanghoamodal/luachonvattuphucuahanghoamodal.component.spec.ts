import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LuachonvattuphucuahanghoamodalComponent } from './luachonvattuphucuahanghoamodal.component';

describe('LuachonvattuphucuahanghoamodalComponent', () => {
  let component: LuachonvattuphucuahanghoamodalComponent;
  let fixture: ComponentFixture<LuachonvattuphucuahanghoamodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LuachonvattuphucuahanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuachonvattuphucuahanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
