import { TestBed } from '@angular/core/testing';

import { LongueurService } from '../app/services/longueur.service';

describe('LongueurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LongueurService = TestBed.get(LongueurService);
    expect(service).toBeTruthy();
  });
});
