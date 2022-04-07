import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThanhtoanhopdongsoimodalComponent } from './thanhtoanhopdongsoimodal.component';

describe('ThanhtoanhopdongsoimodalComponent', () => {
  let component: ThanhtoanhopdongsoimodalComponent;
  let fixture: ComponentFixture<ThanhtoanhopdongsoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanhopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanhopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
