export interface IPhoto {
  id?: number;
  name?: string;
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public name?: string
  ) {
  }
}
