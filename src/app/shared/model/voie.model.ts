import { ICotation } from './cotation.model';

export interface IVoie {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  description?: string;
  userId?: number;
  secteurId?: number;
}

export class Voie implements IVoie {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation,
    public description?: string,
    public userId?: number,
    public secteurId?: number
  ) {
  }
}
