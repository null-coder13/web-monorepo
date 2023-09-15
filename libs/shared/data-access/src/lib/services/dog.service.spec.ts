import { TestBed } from '@angular/core/testing';

import { BobaService } from './boba.service';

describe('BobaService', () => {
  let service: BobaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BobaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
