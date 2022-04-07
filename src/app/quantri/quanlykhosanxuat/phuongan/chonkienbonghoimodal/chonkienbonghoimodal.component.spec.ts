import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonkienbonghoimodalComponent } from './chonkienbonghoimodal.component';

describe('ChonkienbonghoimodalComponent', () => {
  let component: ChonkienbonghoimodalComponent;
  let fixture: ComponentFixture<ChonkienbonghoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonkienbonghoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonkienbonghoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
