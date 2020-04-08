import {Voie} from './voie.model';

export interface ISecteur {
  id?: number;
  name?: string;
  voies?: Voie[];
  description?: string;
}

export class Secteur implements ISecteur {
  constructor(
    public id?: number,
    public name?: string,
    public voies?: Voie[],
    public description?: string
  ) {
  }
}
