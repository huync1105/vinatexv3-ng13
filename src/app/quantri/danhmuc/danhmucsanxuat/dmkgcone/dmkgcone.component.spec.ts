import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmkgconeComponent } from './dmkgcone.component';

describe('DmkgconeComponent', () => {
  let component: DmkgconeComponent;
  let fixture: ComponentFixture<DmkgconeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkgconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkgconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
