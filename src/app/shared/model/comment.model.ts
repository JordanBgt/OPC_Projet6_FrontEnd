import {Spot} from './spot.model';
import {User} from './user.model';

export interface IComment {
  id?: number;
  description?: string;
  date?: Date;
  user?: User;
}

export class Comment implements IComment {
  constructor(
    public id?: number,
    public description?: string,
    public date?: Date,
    public user?: User
  ) {
  }
}
