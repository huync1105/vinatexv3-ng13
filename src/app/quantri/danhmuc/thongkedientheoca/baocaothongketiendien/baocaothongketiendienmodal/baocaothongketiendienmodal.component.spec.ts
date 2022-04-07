import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BaocaothongketiendienmodalComponent } from './baocaothongketiendienmodal.component';

describe('BaocaothongketiendienmodalComponent', () => {
  let component: BaocaothongketiendienmodalComponent;
  let fixture: ComponentFixture<BaocaothongketiendienmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaothongketiendienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaothongketiendienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
