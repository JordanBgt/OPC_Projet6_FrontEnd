import { Spot } from './spot.model';
import { Voie } from './voie.model';

export interface ISecteurLight {
  id?: number;
  name?: string;
  spotId?: number;
}

export class SecteurLight implements ISecteurLight {
  constructor(
    public id?: number,
    public name?: string,
    public spotId?: number,
  ) {
  }
}
