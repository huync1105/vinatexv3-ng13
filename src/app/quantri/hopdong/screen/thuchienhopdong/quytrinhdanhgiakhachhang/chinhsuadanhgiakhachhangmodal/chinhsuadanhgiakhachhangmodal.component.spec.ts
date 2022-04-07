import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChinhsuadanhgiakhachhangmodalComponent } from './chinhsuadanhgiakhachhangmodal.component';

describe('ChinhsuadanhgiakhachhangmodalComponent', () => {
  let component: ChinhsuadanhgiakhachhangmodalComponent;
  let fixture: ComponentFixture<ChinhsuadanhgiakhachhangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinhsuadanhgiakhachhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinhsuadanhgiakhachhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
