import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhobonghoiComponent } from './tonkhobonghoi.component';

describe('TonkhobonghoiComponent', () => {
  let component: TonkhobonghoiComponent;
  let fixture: ComponentFixture<TonkhobonghoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobonghoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobonghoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
