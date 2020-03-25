import {Voie} from './voie.model';

export interface ILongueur {
  id?: number;
  name?: string;
  cotationMin?: string;
  cotationMax?: string;
  voie?: Voie;
}

export class Longueur implements ILongueur {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: string,
    public cotationMax?: string,
    public voie?: Voie
  ) {
  }
}
