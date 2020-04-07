import { ICotation } from './cotation.model';

export interface ISpotLight {
  id?: number;
  country?: string;
  city?: string;
  isOfficial?: boolean;
  userId?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
}

export class SpotLight implements ISpotLight {
  constructor(
    public id?: number,
    public country?: string,
    public city?: string,
    public isOfficial?: boolean,
    public userId?: number,
    public name?: string,
    public cotationMin?: ICotation,
    public cotationMax?: ICotation
  ) {
  }
}
