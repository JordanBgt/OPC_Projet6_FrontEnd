import { TestBed } from '@angular/core/testing';

import { VoieService } from '../app/entities/voie/voie.service';

describe('VoieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoieService = TestBed.get(VoieService);
    expect(service).toBeTruthy();
  });
});
