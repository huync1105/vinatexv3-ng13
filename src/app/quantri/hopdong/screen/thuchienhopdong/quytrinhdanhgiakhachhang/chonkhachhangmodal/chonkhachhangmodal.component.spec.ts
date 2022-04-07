import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonkhachhangmodalComponent } from './chonkhachhangmodal.component';

describe('ChonkhachhangmodalComponent', () => {
  let component: ChonkhachhangmodalComponent;
  let fixture: ComponentFixture<ChonkhachhangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonkhachhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonkhachhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
