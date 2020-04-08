export interface ISecteurLight {
  id?: number;
  name?: string;
}

export class SecteurLight implements ISecteurLight {
  constructor(
    public id?: number,
    public name?: string,
  ) {
  }
}
