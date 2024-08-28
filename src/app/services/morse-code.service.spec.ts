import { TestBed } from '@angular/core/testing';

import { MorseCodeService } from './morse-code.service';

describe('MorseCodeService', () => {
  let service: MorseCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MorseCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
