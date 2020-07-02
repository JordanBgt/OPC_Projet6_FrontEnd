import { BookingState } from './booking-state.enum';
import { TopoLight } from './topo-light.model';

export class TopoUserLight {
  id: number;
  bookingDate: string;
  bookingState: BookingState;
  topo: TopoLight;

  constructor(data: Partial<TopoUserLight>) {
    Object.assign(this, data);
  }

}
