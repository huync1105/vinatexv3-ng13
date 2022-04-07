import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChiphixoComponent } from './chiphixo.component';

describe('ChiphixoComponent', () => {
  let component: ChiphixoComponent;
  let fixture: ComponentFixture<ChiphixoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
