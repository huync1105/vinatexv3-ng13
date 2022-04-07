import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BiendongComponent } from './biendong.component';

describe('BiendongComponent', () => {
  let component: BiendongComponent;
  let fixture: ComponentFixture<BiendongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiendongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiendongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
