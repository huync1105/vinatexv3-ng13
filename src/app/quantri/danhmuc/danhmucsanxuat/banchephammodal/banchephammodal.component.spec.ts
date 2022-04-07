import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BanchephammodalComponent } from './banchephammodal.component';

describe('BanchephammodalComponent', () => {
  let component: BanchephammodalComponent;
  let fixture: ComponentFixture<BanchephammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BanchephammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanchephammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
