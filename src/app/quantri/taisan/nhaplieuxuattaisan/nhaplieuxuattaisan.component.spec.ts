import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan.component';

describe('NhaplieuxuattaisanComponent', () => {
  let component: NhaplieuxuattaisanComponent;
  let fixture: ComponentFixture<NhaplieuxuattaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaplieuxuattaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaplieuxuattaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
