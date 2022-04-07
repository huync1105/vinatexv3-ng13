import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitiethanghoacuahopdongsoimodalComponent } from './chitiethanghoacuahopdongsoimodal.component';

describe('ChitiethanghoacuahopdongsoimodalComponent', () => {
  let component: ChitiethanghoacuahopdongsoimodalComponent;
  let fixture: ComponentFixture<ChitiethanghoacuahopdongsoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiethanghoacuahopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiethanghoacuahopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
