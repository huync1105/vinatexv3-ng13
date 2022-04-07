import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BaocaothongketiendienComponent } from './baocaothongketiendien.component';

describe('BaocaothongketiendienComponent', () => {
  let component: BaocaothongketiendienComponent;
  let fixture: ComponentFixture<BaocaothongketiendienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaothongketiendienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaothongketiendienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
