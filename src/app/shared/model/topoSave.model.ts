import { Cotation } from './cotation.model';

export interface ITopoSave {
  cotationMin?: Cotation;
  cotationMax?: Cotation;
  country?: string;
  description?: string;
  name?: string;
  region?: string;
  userId?: number;
}

export class TopoSave implements ITopoSave {
  constructor(
    public cotationMin?: Cotation,
    public cotationMax?: Cotation,
    public country?: string,
    public description?: string,
    public name?: string,
    public region?: string,
    public userId?: number
  ) {
  }
}
