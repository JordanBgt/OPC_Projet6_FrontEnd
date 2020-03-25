import { Cotation } from './cotation.model';

export interface IVoieSave {
  cotationMin?: Cotation;
  cotationMax?: Cotation;
  name?: string;
  secteurId?: number;
}

export class VoieSave implements IVoieSave {
  constructor(
    public cotationMin?: Cotation,
    public cotationMax?: Cotation,
    public name?: string,
    public secteurId?: number
  ) {
  }
}
