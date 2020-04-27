export interface IComment {
  id?: number;
  content?: string;
  date?: Date;
  userId?: number;
  spotId?: number;
}

export class Comment implements IComment {
  constructor(
    public id?: number,
    public content?: string,
    public date?: Date,
    public user?: number,
    public spotId?: number
  ) {
  }
}
