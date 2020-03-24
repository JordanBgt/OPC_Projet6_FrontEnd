import {Spot} from './spot.model';
import {Photo} from './photo.model';

export interface ITopo {
  id?: number;
  name?: string;
  description?: string;
  cotation?: string;
  isAvailable?: boolean;
  country?: string;
  region?: string;
  spots?: Spot[];
  creatorId?: number;
  tenantId?: number;
  publicationDate?: Date;
  photo?: Photo;
}

export class Topo implements ITopo {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public cotation?: string,
    public isAvailable?: boolean,
    public country?: string,
    public region?: string,
    public spots?: Spot[],
    public creatorId?: number,
    public tenantId?: number,
    public publicationDate?: Date,
    public photo?: Photo
  ) {
  }
}
