import { Role } from './role.model';
import { TopoLight } from './topo-light.model';
import { SpotLight } from './spot-light.model';

export class User  {
  id: number;
  username: string;
  password?: string;
  email: string;
  role: Role[];
  toposCreated: TopoLight[];
  toposRent: TopoLight[];
  spotsCreated: SpotLight[];

  constructor() {}

  userForProfilUtilisation(data: Partial<User>) {
    Object.assign(this, data);
  }
}

