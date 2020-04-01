import { TestBed } from '@angular/core/testing';

import { TopoDetailService } from '../app/entities/topo-detail/topo-detail.service';

describe('TopoDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopoDetailService = TestBed.get(TopoDetailService);
    expect(service).toBeTruthy();
  });
});
