import { Cotation } from './model/cotation.model';

export function findIndexCotation(cotations: Cotation[], cotationToFind: Cotation): number {
  return  cotations.findIndex(cotation => cotation.id === cotationToFind.id);
}

export function findIndexEntity(entities: object[], idEntityToFind: number): number {
  // @ts-ignore
  return entities.findIndex(entity => entity.id === idEntityToFind);
}
