import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietxuatkhothanhphamhopdongComponent } from './chitietxuatkhothanhphamhopdong.component';

describe('ChitietxuatkhothanhphamhopdongComponent', () => {
  let component: ChitietxuatkhothanhphamhopdongComponent;
  let fixture: ComponentFixture<ChitietxuatkhothanhphamhopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietxuatkhothanhphamhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietxuatkhothanhphamhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
