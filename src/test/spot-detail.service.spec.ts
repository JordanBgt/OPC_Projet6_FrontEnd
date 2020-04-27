import { TestBed } from '@angular/core/testing';

import { SpotDetailService } from '../app/spot-detail/spot-detail.service';

describe('SpotDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotDetailService = TestBed.get(SpotDetailService);
    expect(service).toBeTruthy();
  });
});
