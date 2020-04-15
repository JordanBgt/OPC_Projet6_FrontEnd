import { ISpot } from './spot.model';
import { IPhoto } from './photo.model';
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
  spots?: ISpot[];
  creatorId?: number;
  tenantId?: number;
  publicationDate?: Date;
  photo?: IPhoto;
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
    public spots?: ISpot[],
    public creatorId?: number,
    public tenantId?: number,
    public publicationDate?: Date,
    public photo?: IPhoto
  ) {
  }
}
