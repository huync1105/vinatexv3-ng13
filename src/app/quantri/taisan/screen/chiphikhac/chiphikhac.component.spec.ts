import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChiphikhacComponent } from './chiphikhac.component';

describe('ChiphikhacComponent', () => {
  let component: ChiphikhacComponent;
  let fixture: ComponentFixture<ChiphikhacComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphikhacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphikhacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
