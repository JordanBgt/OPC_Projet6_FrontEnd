import {Longueur} from './longueur.model';

export interface IVoie {
  id?: number;
  name?: string;
  cotationMin?: string;
  cotationMax?: string;
  secteurId?: number;
  longeurs?: Longueur[];
}

export class Voie implements IVoie {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: string,
    public cotationMax?: string,
    public secteurId?: number,
    public longueurs?: Longueur[]
  ) {
  }
}
