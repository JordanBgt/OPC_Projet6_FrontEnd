import { TestBed } from '@angular/core/testing';

import { VoieDetailService } from '../app/entities/voie-detail/voie-detail.service';

describe('VoieDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoieDetailService = TestBed.get(VoieDetailService);
    expect(service).toBeTruthy();
  });
});
