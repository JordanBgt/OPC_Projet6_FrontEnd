import {Voie} from './voie.model';

export interface ILongueur {
  id?: number;
  name?: string;
  cotation?: string;
  voie?: Voie;
}

export class Longueur implements ILongueur {
  constructor(
    public id?: number,
    public name?: string,
    public cotation?: string,
    public voie?: Voie
  ) {
  }
}
