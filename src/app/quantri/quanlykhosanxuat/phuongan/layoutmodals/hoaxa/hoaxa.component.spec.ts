import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { HoaxaComponent } from './hoaxa.component';

describe('HoaxaComponent', () => {
  let component: HoaxaComponent;
  let fixture: ComponentFixture<HoaxaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HoaxaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoaxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
