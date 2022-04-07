import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonComponent } from './chon.component';

describe('ChonComponent', () => {
  let component: ChonComponent;
  let fixture: ComponentFixture<ChonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
