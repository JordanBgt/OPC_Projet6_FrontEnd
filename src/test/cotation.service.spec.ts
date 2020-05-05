import { TestBed } from '@angular/core/testing';

import { CotationService } from '../app/services/cotation.service';

describe('CotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CotationService = TestBed.get(CotationService);
    expect(service).toBeTruthy();
  });
});
