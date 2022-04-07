import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhohoiammodalComponent } from './tonkhohoiammodal.component';

describe('TonkhohoiammodalComponent', () => {
  let component: TonkhohoiammodalComponent;
  let fixture: ComponentFixture<TonkhohoiammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhohoiammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhohoiammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
