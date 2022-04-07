import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhobongphemodalComponent } from './tonkhobongphemodal.component';

describe('TonkhobongphemodalComponent', () => {
  let component: TonkhobongphemodalComponent;
  let fixture: ComponentFixture<TonkhobongphemodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongphemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongphemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
