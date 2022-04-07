import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChiphimodalComponent } from './chiphimodal.component';

describe('ChiphimodalComponent', () => {
  let component: ChiphimodalComponent;
  let fixture: ComponentFixture<ChiphimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
