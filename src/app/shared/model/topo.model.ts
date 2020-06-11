import { Spot } from './spot.model';
import { ICotation } from './cotation.model';
import { Photo } from './photo.model';

export class Topo {
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

  constructor(data: Partial<Topo>) {
    Object.assign(this, data, {
      photo: data.photo != null ? new Photo(data.photo) : null
    });
  }
}

