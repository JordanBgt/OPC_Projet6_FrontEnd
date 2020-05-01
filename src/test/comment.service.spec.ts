import { TestBed } from '@angular/core/testing';

import { CommentService } from '../app/services/comment.service';

describe('CommentaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });
});
