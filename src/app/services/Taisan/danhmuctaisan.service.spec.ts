import { TestBed } from '@angular/core/testing';

import { DanhmuctaisanService } from './danhmuctaisan.service';

describe('DanhmuctaisanService', () => {
  let service: DanhmuctaisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhmuctaisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
