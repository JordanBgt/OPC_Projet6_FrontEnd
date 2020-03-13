import {User} from './user.model';

export interface IRole {
  id?: number;
  name?: string;
}

export class Role implements IRole {
  constructor(
    id?: number,
    name?: string,
  ) {
  }
}
