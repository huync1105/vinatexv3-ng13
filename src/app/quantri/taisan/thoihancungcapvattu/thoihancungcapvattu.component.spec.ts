import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThoihancungcapvattuComponent } from './thoihancungcapvattu.component';

describe('ThoihancungcapvattuComponent', () => {
  let component: ThoihancungcapvattuComponent;
  let fixture: ComponentFixture<ThoihancungcapvattuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoihancungcapvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoihancungcapvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
