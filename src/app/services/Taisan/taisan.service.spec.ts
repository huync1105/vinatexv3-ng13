import { TestBed } from '@angular/core/testing';

import { TaisanService } from './taisan.service';

describe('TaisanService', () => {
  let service: TaisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
