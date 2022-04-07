import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldmnhacungcapComponent } from './modaldmnhacungcap.component';

describe('ModaldmnhacungcapComponent', () => {
  let component: ModaldmnhacungcapComponent;
  let fixture: ComponentFixture<ModaldmnhacungcapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmnhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
