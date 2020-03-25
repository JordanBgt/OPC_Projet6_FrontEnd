import { Cotation } from './cotation.model';

export interface ILongueurSave {
  cotationMin?: Cotation;
  cotationMax?: Cotation;
  name?: string;
  voieId?: number;
}

export class LongueurSave implements ILongueurSave{
  constructor(
    public cotationMin?: Cotation,
    public cotationMax?: Cotation,
    public name?: string,
    public voieId?: number
  ) {
  }
}
