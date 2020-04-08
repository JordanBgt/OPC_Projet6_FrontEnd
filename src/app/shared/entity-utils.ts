import { Cotation } from './model/cotation.model';

export function findIndexCotation(cotations: Cotation[], cotationToFind: Cotation): number {
  return  cotations.findIndex(cotation => cotation.id === cotationToFind.id);
}
