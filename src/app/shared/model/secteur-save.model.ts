export interface ISecteurSave {
  name?: string;
  description?: string;
  userId?: number;
}

export class SecteurSave implements ISecteurSave {
  constructor(
    public name?: string,
    public description?: string,
    public userId?: number
  ) {
  }
}
