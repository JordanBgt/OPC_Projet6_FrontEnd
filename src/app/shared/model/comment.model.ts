import { UserLight } from './user-light.model';

export interface IComment {
  id?: number;
  content?: string;
  date?: Date;
  user?: UserLight;
  spotId?: number;
}

export class Comment implements IComment {
  constructor(
    public id?: number,
    public content?: string,
    public date?: Date,
    public user?: UserLight,
    public spotId?: number
  ) {
  }
}
