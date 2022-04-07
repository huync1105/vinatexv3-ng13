import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TonkhodanhsachchitietComponent } from './tonkhodanhsachchitiet.component';

describe('TonkhodanhsachchitietComponent', () => {
  let component: TonkhodanhsachchitietComponent;
  let fixture: ComponentFixture<TonkhodanhsachchitietComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhodanhsachchitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhodanhsachchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
