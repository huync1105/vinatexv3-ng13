import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhoComponent } from './tonkho.component';

describe('TonkhoComponent', () => {
  let component: TonkhoComponent;
  let fixture: ComponentFixture<TonkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
