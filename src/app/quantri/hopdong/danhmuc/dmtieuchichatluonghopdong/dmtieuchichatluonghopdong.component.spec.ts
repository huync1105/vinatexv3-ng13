import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmtieuchichatluonghopdongComponent } from './dmtieuchichatluonghopdong.component';

describe('DmtieuchichatluonghopdongComponent', () => {
  let component: DmtieuchichatluonghopdongComponent;
  let fixture: ComponentFixture<DmtieuchichatluonghopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtieuchichatluonghopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtieuchichatluonghopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
