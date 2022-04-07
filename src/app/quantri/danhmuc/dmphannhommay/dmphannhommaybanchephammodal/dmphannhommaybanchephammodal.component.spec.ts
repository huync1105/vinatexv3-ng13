import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmphannhommaybanchephammodalComponent } from './dmphannhommaybanchephammodal.component';

describe('DmphannhommaybanchephammodalComponent', () => {
  let component: DmphannhommaybanchephammodalComponent;
  let fixture: ComponentFixture<DmphannhommaybanchephammodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmphannhommaybanchephammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmphannhommaybanchephammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
