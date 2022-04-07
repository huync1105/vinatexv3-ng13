import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldmdonviComponent } from './modaldmdonvi.component';

describe('ModaldmdonviComponent', () => {
  let component: ModaldmdonviComponent;
  let fixture: ComponentFixture<ModaldmdonviComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmdonviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmdonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
