import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongsokythuatComponent } from './thongsokythuat.component';

describe('ThongsokythuatComponent', () => {
  let component: ThongsokythuatComponent;
  let fixture: ComponentFixture<ThongsokythuatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongsokythuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongsokythuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
