import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TaisanComponent } from './taisan.component';

describe('TaisanComponent', () => {
  let component: TaisanComponent;
  let fixture: ComponentFixture<TaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
