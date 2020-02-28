import {Spot} from './spot.model';
import {Voie} from './voie.model';

export interface ISecteur {
  id?: number;
  name?: string;
  spot?: Spot;
  voies?: Voie[];
}

export class Secteur implements ISecteur {
  constructor(
    public id?: number,
    public name?: string,
    public spot?: Spot,
    public voies?: Voie[]
  ) {
  }
}
