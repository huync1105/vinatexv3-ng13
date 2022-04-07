import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhobongxomodalComponent } from './tonkhobongxomodal.component';

describe('TonkhobongxomodalComponent', () => {
  let component: TonkhobongxomodalComponent;
  let fixture: ComponentFixture<TonkhobongxomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
