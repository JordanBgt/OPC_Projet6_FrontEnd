import {Secteur} from './secteur.model';
import {Longueur} from './longueur.model';

export interface IVoie {
  id?: number;
  name?: string;
  cotation?: string;
  secteurId?: number;
  longeurs?: Longueur[];
}

export class Voie implements IVoie {
  constructor(
    public id?: number,
    public name?: string,
    public cotation?: string,
    public secteurId?: number,
    public longueurs?: Longueur[]
  ) {
  }
}
