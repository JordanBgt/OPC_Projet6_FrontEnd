import { Cotation } from './cotation.model';

export interface ILongueurSave {
  cotationMin?: Cotation;
  cotationMax?: Cotation;
  name?: string;
  description?: string;
  userId?: number;
}

export class LongueurSave implements ILongueurSave{
  constructor(
    public cotationMin?: Cotation,
    public cotationMax?: Cotation,
    public name?: string,
    public description?: string,
    public userId?: number
  ) {
  }
}
