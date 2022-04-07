import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhansuthuchienmodalComponent } from './nhansuthuchienmodal.component';

describe('NhansuthuchienmodalComponent', () => {
  let component: NhansuthuchienmodalComponent;
  let fixture: ComponentFixture<NhansuthuchienmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhansuthuchienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhansuthuchienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
