import { Cotation } from './model/cotation.model';

/**
 * Allows to find the index of a cotation in a cotations array
 * @param cotations arrays of cotations
 * @param cotationToFind the cotation whose index we want to find
 */
export function findIndexCotation(cotations: Cotation[], cotationToFind: Cotation): number {
  return  cotations.findIndex(cotation => cotation.id === cotationToFind.id);
}

/**
 * Allows to find the index of an entity in an entity array
 * @param entities arrays of entities
 * @param idEntityToFind the id of the entity whose index we want to find
 */
export function findIndexEntity(entities: object[], idEntityToFind: number): number {
  // @ts-ignore
  return entities.findIndex(entity => entity.id === idEntityToFind);
}
