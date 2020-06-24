import { BookingState } from './booking-state.enum';
import { UserLight } from './user-light.model';
import { TopoLight } from './topo-light.model';

export class TopoUser {
  id: number;
  available: boolean;
  bookingDate: string;
  bookingState: BookingState;
  owner: UserLight;
  tenant: UserLight;
  topo: TopoLight;

  constructor(data: Partial<TopoUser>) {
    Object.assign(this, data);
  }

}
