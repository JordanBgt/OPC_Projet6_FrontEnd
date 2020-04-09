import { Cotation } from './cotation.model';

export interface IVoieSave {
  cotationMin?: Cotation;
  cotationMax?: Cotation;
  name?: string;
  description?: string;
}

export class VoieSave implements IVoieSave {
  constructor(
    public cotationMin?: Cotation,
    public cotationMax?: Cotation,
    public name?: string,
    public description?: string
  ) {
  }
}
