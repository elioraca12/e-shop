import { TestBed } from '@angular/core/testing';

import { BailiffService } from './bailiff.service';

describe('BailiffService', () => {
  let service: BailiffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BailiffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
