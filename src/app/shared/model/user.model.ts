import { Role } from './role.model';

export class User  {
  id: number;
  username: string;
  password?: string;
  email: string;
  role: Role[];

  constructor() {}

  userForProfilUtilisation(data: Partial<User>) {
    Object.assign(this, data);
  }
}

