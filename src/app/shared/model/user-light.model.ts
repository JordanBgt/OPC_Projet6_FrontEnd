export interface IUserLight {
  id?: number;
  username?: string;
  email?: string;
}

export class UserLight implements IUserLight {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string
  ) {
  }
}
