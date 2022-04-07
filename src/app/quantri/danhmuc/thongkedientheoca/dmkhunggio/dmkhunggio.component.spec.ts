import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmkhunggioComponent } from './dmkhunggio.component';

describe('DmkhunggioComponent', () => {
  let component: DmkhunggioComponent;
  let fixture: ComponentFixture<DmkhunggioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhunggioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhunggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
