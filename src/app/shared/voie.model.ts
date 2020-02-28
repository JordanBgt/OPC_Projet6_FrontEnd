import {Secteur} from './secteur.model';
import {Longueur} from './longueur.model';

export interface IVoie {
  id?: number;
  name?: string;
  cotation?: string;
  secteur?: Secteur;
  longeurs?: Longueur[];
}

export class Voie implements IVoie {
  constructor(
    public id?: number,
    public name?: string,
    public cotation?: string,
    public secteur?: Secteur,
    public longueurs?: Longueur[]
  ) {
  }
}
