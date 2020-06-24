import { Spot } from './spot.model';
import { ICotation } from './cotation.model';
import { Photo } from './photo.model';
import { TopoUser } from './topo-user.model';

export class Topo {
  id?: number;
  name?: string;
  description?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  country?: string;
  region?: string;
  spots?: Spot[];
  creatorId?: number;
  publicationDate?: Date;
  photo?: Photo;
  topoUsers: TopoUser[];

  constructor(data: Partial<Topo>) {
    Object.assign(this, data, {
      photo: data.photo != null ? new Photo(data.photo) : null
    });
  }
}

