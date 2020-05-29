export interface IPhoto {
  id?: number;
  name?: string;
  extension?: string;
  file?: File;
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public name?: string,
    public extension?: string,
    public file?: File
  ) {
  }
}
