import { IPhoto } from './photo.model';
import { ICotation } from './cotation.model';
import { ISecteurLight } from './secteur-light.model';

export interface ISpot {
  id?: number;
  country?: string;
  city?: string;
  description?: string;
  official?: boolean;
  topoId?: number;
  photos?: IPhoto[];
  secteurs?: ISecteurLight[];
  userId?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
}

export class Spot implements ISpot {
  constructor(
    public id?: number,
    public country?: string,
    public city?: string,
    public description?: string,
    public official?: boolean,
    public topoId?: number,
    public photos?: IPhoto[],
    public secteurs?: ISecteurLight[],
    public userId?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation
  ) {
  }
}
