import { IVoie } from './voie.model';

export interface ISecteur {
  id?: number;
  name?: string;
  voies?: IVoie[];
  description?: string;
}

export class Secteur implements ISecteur {
  constructor(
    public id?: number,
    public name?: string,
    public voies?: IVoie[],
    public description?: string
  ) {
  }
}
