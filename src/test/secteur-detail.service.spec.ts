import { TestBed } from '@angular/core/testing';

import { SecteurDetailService } from '../app/secteur-detail/secteur-detail.service';

describe('SecteurDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecteurDetailService = TestBed.get(SecteurDetailService);
    expect(service).toBeTruthy();
  });
});
