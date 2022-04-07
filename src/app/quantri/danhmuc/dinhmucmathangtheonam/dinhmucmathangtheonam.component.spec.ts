import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DinhmucmathangtheonamComponent } from './dinhmucmathangtheonam.component';

describe('DinhmucmathangtheonamComponent', () => {
  let component: DinhmucmathangtheonamComponent;
  let fixture: ComponentFixture<DinhmucmathangtheonamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucmathangtheonamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucmathangtheonamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
