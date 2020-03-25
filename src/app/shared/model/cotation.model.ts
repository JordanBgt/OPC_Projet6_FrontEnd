export interface ICotation {
  id?: number;
  label?: string;
}

export class Cotation implements ICotation {
  constructor(
    public id?: number,
    public label?: string
  ) {
  }
}
