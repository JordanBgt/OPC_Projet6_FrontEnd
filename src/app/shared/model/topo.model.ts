import {Spot} from './spot.model';
import {Photo} from './photo.model';
import { ICotation } from './cotation.model';

export interface ITopo {
  id?: number;
  name?: string;
  description?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
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
    public cotationMin?: ICotation,
    public cotationMax?: ICotation,
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
