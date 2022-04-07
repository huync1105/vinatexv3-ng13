import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmtieuchichatluongsoiComponent } from './dmtieuchichatluongsoi.component';

describe('DmtieuchichatluongsoiComponent', () => {
  let component: DmtieuchichatluongsoiComponent;
  let fixture: ComponentFixture<DmtieuchichatluongsoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtieuchichatluongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtieuchichatluongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
