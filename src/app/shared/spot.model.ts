import {Topo} from './topo.model';
import {Photo} from './photo.model';
import {Secteur} from './secteur.model';
import {Comment} from './comment.model';
import {User} from './user.model';

export interface ISpot {
  id?: number;
  country?: string;
  city?: string;
  description?: string;
  isOfficial?: boolean;
  topo?: Topo;
  comments?: Comment[];
  photos?: Photo[];
  secteurs?: Secteur[];
  user?: User;
}

export class Spot implements ISpot {
  constructor(
    public id?: number,
    public country?: string,
    public city?: string,
    public description?: string,
    public isOfficial?: boolean,
    public topo?: Topo,
    public comments?: Comment[],
    public photos?: Photo[],
    public secteurs?: Secteur[],
    public user?: User
  ) {
  }
}
