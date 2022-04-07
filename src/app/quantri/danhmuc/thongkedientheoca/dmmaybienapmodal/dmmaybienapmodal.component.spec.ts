import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmmaybienapmodalComponent } from './dmmaybienapmodal.component';

describe('DmmaybienapmodalComponent', () => {
  let component: DmmaybienapmodalComponent;
  let fixture: ComponentFixture<DmmaybienapmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmmaybienapmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmmaybienapmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
