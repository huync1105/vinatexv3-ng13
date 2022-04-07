import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmkhunggiomodalComponent } from './dmkhunggiomodal.component';

describe('DmkhunggiomodalComponent', () => {
  let component: DmkhunggiomodalComponent;
  let fixture: ComponentFixture<DmkhunggiomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhunggiomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhunggiomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
