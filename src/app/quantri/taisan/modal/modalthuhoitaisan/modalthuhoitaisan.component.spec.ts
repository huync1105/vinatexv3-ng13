import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalthuhoitaisanComponent } from './modalthuhoitaisan.component';

describe('ModalthuhoitaisanComponent', () => {
  let component: ModalthuhoitaisanComponent;
  let fixture: ComponentFixture<ModalthuhoitaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthuhoitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthuhoitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
