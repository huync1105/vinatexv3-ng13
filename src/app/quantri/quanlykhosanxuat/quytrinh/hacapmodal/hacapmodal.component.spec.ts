import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HacapmodalComponent } from './hacapmodal.component';

describe('HacapmodalComponent', () => {
  let component: HacapmodalComponent;
  let fixture: ComponentFixture<HacapmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HacapmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacapmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
