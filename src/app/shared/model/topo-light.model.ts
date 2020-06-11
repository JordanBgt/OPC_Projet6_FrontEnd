import {Photo} from './photo.model';
import { ICotation } from './cotation.model';

export class TopoLight {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  isAvailable?: boolean;
  country?: string;
  region?: string;
  photo?: Photo;

  constructor(data: Partial<TopoLight>) {
    Object.assign(this, data, {
      photo: data.photo != null ? new Photo(data.photo) : null
    });
  }
}

