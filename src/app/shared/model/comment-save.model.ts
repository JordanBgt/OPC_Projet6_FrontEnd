export interface ICommentSave {
  content?: string;
  date?: Date;
  userId?: number;
  spotId?: number;
}

export class CommentSave implements ICommentSave {
  constructor(
    public content?: string,
    public date?: Date,
    public userId?: number,
    public spotId?: number
  ) {
  }
}
