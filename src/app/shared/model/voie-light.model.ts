import { ICotation } from './cotation.model';
import { Longueur } from './longueur.model';

export interface IVoieLight {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
}

export class VoieLight implements IVoieLight {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation
  ) {
  }
}
