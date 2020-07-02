import { User } from './user.model';
import { TopoLight } from './topo-light.model';
import { TopoUser } from './topo-user.model';
import { SpotLight } from './spot-light.model';
import { TopoUserLight } from './topo-user-light.model';

export class UserProfile {
  user: User;
  toposCreated: TopoLight[];
  toposOwned: TopoUser[];
  toposRent: TopoUserLight[];
  spotsCreated: SpotLight[];
}
