import {Voie} from './voie.model';
import { ICotation } from './cotation.model';

export interface ILongueur {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  description?: string;
  userId?: number;
}

export class Longueur implements ILongueur {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation,
    public description?: string,
    public userId?: number
  ) {
  }
}
