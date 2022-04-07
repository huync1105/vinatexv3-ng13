import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietbaolanhComponent } from './chitietbaolanh.component';

describe('ChitietbaolanhComponent', () => {
  let component: ChitietbaolanhComponent;
  let fixture: ComponentFixture<ChitietbaolanhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietbaolanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietbaolanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
