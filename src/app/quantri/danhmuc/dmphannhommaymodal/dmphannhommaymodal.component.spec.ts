import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmphannhommaymodalComponent } from './dmphannhommaymodal.component';

describe('DmphannhommaymodalComponent', () => {
  let component: DmphannhommaymodalComponent;
  let fixture: ComponentFixture<DmphannhommaymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmphannhommaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmphannhommaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
