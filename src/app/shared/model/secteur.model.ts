export interface ISecteur {
  id?: number;
  name?: string;
  description?: string;
  userId?: number;
  spotId?: number;
}

export class Secteur implements ISecteur {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public userId?: number,
    public spotId?: number
  ) {
  }
}
