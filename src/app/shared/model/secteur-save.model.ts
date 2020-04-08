export interface ISecteurSave {
  name?: string;
  description?: string;
}

export class SecteurSave implements ISecteurSave {
  constructor(
    public name?: string,
    public description?: string
  ) {
  }
}
