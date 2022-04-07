import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmphannhommayChonmathangmodalComponent } from './dmphannhommay-chonmathangmodal.component';

describe('DmphannhommayChonmathangmodalComponent', () => {
  let component: DmphannhommayChonmathangmodalComponent;
  let fixture: ComponentFixture<DmphannhommayChonmathangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmphannhommayChonmathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmphannhommayChonmathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
