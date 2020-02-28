import {User} from './user.model';

export interface IRole {
  id?: number;
  name?: string;
  users?: User[];
}

export class Role implements IRole {
  constructor(
    id?: number,
    name?: string,
    users?: User[]
  ) {
  }
}
