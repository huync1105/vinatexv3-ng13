import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietkehoachnhapbongComponent } from './chitietkehoachnhapbong.component';

describe('ChitietkehoachnhapbongComponent', () => {
  let component: ChitietkehoachnhapbongComponent;
  let fixture: ComponentFixture<ChitietkehoachnhapbongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietkehoachnhapbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietkehoachnhapbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
