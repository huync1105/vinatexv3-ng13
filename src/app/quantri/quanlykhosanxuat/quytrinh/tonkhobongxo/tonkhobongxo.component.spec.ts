import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhobongxoComponent } from './tonkhobongxo.component';

describe('TonkhobongxoComponent', () => {
  let component: TonkhobongxoComponent;
  let fixture: ComponentFixture<TonkhobongxoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
