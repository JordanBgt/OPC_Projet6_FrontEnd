import {Topo} from './topo.model';
import {Spot} from './spot.model';
import { Role } from './role.model';

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  role?: Role[];
  toposCreated?: Topo[];
  toposRent?: Topo[];
  spotsCreated?: Spot[];
}

export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public email?: string,
    public role?: Role[],
    public toposCreated?: Topo[],
    public toposRent?: Topo[],
    public spotsCreated?: Spot[]
  ) {
  }
}

