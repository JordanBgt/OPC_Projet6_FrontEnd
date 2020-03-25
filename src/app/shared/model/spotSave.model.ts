import { Cotation } from './cotation.model';

export interface ISpotSave {
  city?: string;
  country?: string;
  description?: string;
  userId?: number;
  name?: string;
  cotationMin?: Cotation;
  cotationMax?: Cotation;
}

export class SpotSave implements ISpotSave {
  constructor(
    public city?: string,
    public country?: string,
    public description?: string,
    public userId?: number,
    public name?: string,
    public cotationMin?: Cotation,
    public cotationMax?: Cotation
  ) {
  }
}
