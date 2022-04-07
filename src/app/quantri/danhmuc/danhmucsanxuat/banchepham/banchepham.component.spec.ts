import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BanchephamComponent } from './banchepham.component';

describe('BanchephamComponent', () => {
  let component: BanchephamComponent;
  let fixture: ComponentFixture<BanchephamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BanchephamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanchephamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
