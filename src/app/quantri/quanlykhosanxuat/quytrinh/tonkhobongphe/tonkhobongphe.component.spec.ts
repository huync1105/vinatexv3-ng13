import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhobongpheComponent } from './tonkhobongphe.component';

describe('TonkhobongpheComponent', () => {
  let component: TonkhobongpheComponent;
  let fixture: ComponentFixture<TonkhobongpheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongpheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongpheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
