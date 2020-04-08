import {Photo} from './photo.model';
import {Comment} from './comment.model';
import { ICotation } from './cotation.model';
import { SecteurLight } from './secteur-light.model';

export interface ISpot {
  id?: number;
  country?: string;
  city?: string;
  description?: string;
  official?: boolean;
  topoId?: number;
  comments?: Comment[];
  photos?: Photo[];
  secteurs?: SecteurLight[];
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
    public comments?: Comment[],
    public photos?: Photo[],
    public secteurs?: SecteurLight[],
    public userId?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation
  ) {
  }
}
