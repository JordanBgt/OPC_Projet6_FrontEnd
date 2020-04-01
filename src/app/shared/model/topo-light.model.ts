import {Photo} from './photo.model';
import { ICotation } from './cotation.model';

export interface ITopoLight {
  id?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  isAvailable?: boolean;
  country?: string;
  region?: string;
  photo?: Photo;
}

export class TopoLight implements ITopoLight {
  constructor(
    public id?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation,
    public isAvailable?: boolean,
    public country?: string,
    public region?: string,
    public photo?: Photo
  ) {
  }
}
