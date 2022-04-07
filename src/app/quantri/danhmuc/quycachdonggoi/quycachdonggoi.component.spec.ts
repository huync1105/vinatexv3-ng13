import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuycachdonggoiComponent } from './quycachdonggoi.component';

describe('QuycachdonggoiComponent', () => {
  let component: QuycachdonggoiComponent;
  let fixture: ComponentFixture<QuycachdonggoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuycachdonggoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuycachdonggoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
