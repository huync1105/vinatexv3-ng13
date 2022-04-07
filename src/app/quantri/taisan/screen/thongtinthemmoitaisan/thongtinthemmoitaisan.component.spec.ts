import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongtinthemmoitaisanComponent } from './thongtinthemmoitaisan.component';

describe('ThongtinthemmoitaisanComponent', () => {
  let component: ThongtinthemmoitaisanComponent;
  let fixture: ComponentFixture<ThongtinthemmoitaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinthemmoitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinthemmoitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
