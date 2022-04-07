import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmphannhommayComponent } from './dmphannhommay.component';

describe('DmphannhommayComponent', () => {
  let component: DmphannhommayComponent;
  let fixture: ComponentFixture<DmphannhommayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmphannhommayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmphannhommayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
