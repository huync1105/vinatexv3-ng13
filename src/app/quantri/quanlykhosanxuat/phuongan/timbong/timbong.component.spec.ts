import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TimbongComponent } from './timbong.component';

describe('TimbongComponent', () => {
  let component: TimbongComponent;
  let fixture: ComponentFixture<TimbongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
