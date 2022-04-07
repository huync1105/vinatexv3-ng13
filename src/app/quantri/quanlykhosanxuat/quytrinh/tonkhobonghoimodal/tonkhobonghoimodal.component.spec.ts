import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhobonghoimodalComponent } from './tonkhobonghoimodal.component';

describe('TonkhobonghoimodalComponent', () => {
  let component: TonkhobonghoimodalComponent;
  let fixture: ComponentFixture<TonkhobonghoimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobonghoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobonghoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
