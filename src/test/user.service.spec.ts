import { TestBed } from '@angular/core/testing';

import { UserService } from '../app/entities/user/user.service';

describe('UtilisateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});