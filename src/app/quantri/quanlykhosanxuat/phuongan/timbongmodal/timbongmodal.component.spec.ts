import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TimbongmodalComponent } from './timbongmodal.component';

describe('TimbongmodalComponent', () => {
  let component: TimbongmodalComponent;
  let fixture: ComponentFixture<TimbongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
