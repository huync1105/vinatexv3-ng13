import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TimbongtheobanmodalComponent } from './timbongtheobanmodal.component';

describe('TimbongtheobanmodalComponent', () => {
  let component: TimbongtheobanmodalComponent;
  let fixture: ComponentFixture<TimbongtheobanmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimbongtheobanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimbongtheobanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
