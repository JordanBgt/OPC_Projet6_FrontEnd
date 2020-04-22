import { TestBed } from '@angular/core/testing';

import { LongueurDetailService } from '../app/longueur-detail/longueur-detail.service';

describe('LongueurDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LongueurDetailService = TestBed.get(LongueurDetailService);
    expect(service).toBeTruthy();
  });
});
