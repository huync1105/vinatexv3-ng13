import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TaomoilichbaoduongComponent } from './taomoilichbaoduong.component';

describe('TaomoilichbaoduongComponent', () => {
  let component: TaomoilichbaoduongComponent;
  let fixture: ComponentFixture<TaomoilichbaoduongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoilichbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoilichbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
