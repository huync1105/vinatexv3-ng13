import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonkienchovaymodalComponent } from './chonkienchovaymodal.component';

describe('ChonkienchovaymodalComponent', () => {
  let component: ChonkienchovaymodalComponent;
  let fixture: ComponentFixture<ChonkienchovaymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonkienchovaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonkienchovaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
