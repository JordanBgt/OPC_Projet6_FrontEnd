import { TestBed } from '@angular/core/testing';

import { UserProfileService } from '../app/services/user-profile.service';

describe('ProfileService', () => {
  let service: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
