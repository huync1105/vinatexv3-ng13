import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalmucdouutienComponent } from './modalmucdouutien.component';

describe('ModalmucdouutienComponent', () => {
  let component: ModalmucdouutienComponent;
  let fixture: ComponentFixture<ModalmucdouutienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmucdouutienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmucdouutienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
