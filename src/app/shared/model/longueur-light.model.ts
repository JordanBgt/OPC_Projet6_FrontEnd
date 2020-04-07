import { ICotation } from './cotation.model';
import { Voie } from './voie.model';

export interface ILongueurLight {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
}

export class LongueurLight implements ILongueurLight {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation
  ) {
  }
}
