import { TestBed } from '@angular/core/testing';

import { UtilisateurService } from '../app/utilisateur.service';

describe('UtilisateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilisateurService = TestBed.get(UtilisateurService);
    expect(service).toBeTruthy();
  });
});
