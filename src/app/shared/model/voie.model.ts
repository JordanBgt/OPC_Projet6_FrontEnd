import {Longueur} from './longueur.model';
import { ICotation } from './cotation.model';

export interface IVoie {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  secteurId?: number;
  longeurs?: Longueur[];
}

export class Voie implements IVoie {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation,
    public secteurId?: number,
    public longueurs?: Longueur[]
  ) {
  }
}
