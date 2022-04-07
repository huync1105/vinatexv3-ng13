import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChoncaapdungmodalComponent } from './choncaapdungmodal.component';

describe('ChoncaapdungmodalComponent', () => {
  let component: ChoncaapdungmodalComponent;
  let fixture: ComponentFixture<ChoncaapdungmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoncaapdungmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoncaapdungmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
