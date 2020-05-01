import { ICotation } from './cotation.model';

export interface ILongueur {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  description?: string;
  userId?: number;
  voieId?: number;
}

export class Longueur implements ILongueur {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation,
    public description?: string,
    public userId?: number,
    public voieId?: number
  ) {
  }
}
