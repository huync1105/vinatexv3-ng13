import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitiethopdongbongxomodalComponent } from './chitiethopdongbongxomodal.component';

describe('ChitiethopdongbongxomodalComponent', () => {
  let component: ChitiethopdongbongxomodalComponent;
  let fixture: ComponentFixture<ChitiethopdongbongxomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiethopdongbongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiethopdongbongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
