import { User } from './user.model';
import { TopoLight } from './topo-light.model';
import { TopoUser } from './topo-user.model';
import { SpotLight } from './spot-light.model';

export class UserProfile {
  user: User;
  toposCreated: TopoLight[];
  toposOwned: TopoUser[];
  toposRent: TopoLight[];
  spotsCreated: SpotLight[];
}
