import {Voie} from './voie.model';

export interface ISecteur {
  id?: number;
  name?: string;
  voies?: Voie[];
}

export class Secteur implements ISecteur {
  constructor(
    public id?: number,
    public name?: string,
    public voies?: Voie[]
  ) {
  }
}
