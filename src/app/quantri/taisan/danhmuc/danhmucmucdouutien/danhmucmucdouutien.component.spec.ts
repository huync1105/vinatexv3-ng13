import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucmucdouutienComponent } from './danhmucmucdouutien.component';

describe('DanhmucmucdouutienComponent', () => {
  let component: DanhmucmucdouutienComponent;
  let fixture: ComponentFixture<DanhmucmucdouutienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucmucdouutienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucmucdouutienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
