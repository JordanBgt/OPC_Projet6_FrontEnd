import { TestBed } from '@angular/core/testing';

import { SecteurService } from '../app/services/secteur.service';

describe('SecteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecteurService = TestBed.get(SecteurService);
    expect(service).toBeTruthy();
  });
});
