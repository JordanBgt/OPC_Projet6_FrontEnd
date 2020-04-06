export interface ISpotLight {
  id?: number;
  country?: string;
  city?: string;
  isOfficial?: boolean;
  userId?: number;
  name?: string;
  cotationMin?: string;
  cotationMax?: string;
}

export class SpotLight implements ISpotLight {
  constructor(
    public id?: number,
    public country?: string,
    public city?: string,
    public isOfficial?: boolean,
    public userId?: number,
    public name?: string,
    public cotationMin?: string,
    public cotationMax?: string
  ) {
  }
}
