import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietbaolanhmodalComponent } from './chitietbaolanhmodal.component';

describe('ChitietbaolanhmodalComponent', () => {
  let component: ChitietbaolanhmodalComponent;
  let fixture: ComponentFixture<ChitietbaolanhmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietbaolanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietbaolanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
