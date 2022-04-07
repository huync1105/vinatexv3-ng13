import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalnhaplieuxuattaisanComponent } from './modalnhaplieuxuattaisan.component';

describe('ModalnhaplieuxuattaisanComponent', () => {
  let component: ModalnhaplieuxuattaisanComponent;
  let fixture: ComponentFixture<ModalnhaplieuxuattaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalnhaplieuxuattaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalnhaplieuxuattaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
