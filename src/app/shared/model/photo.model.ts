export class Photo {
  id: number;
  name: string;
  extension: string;
  fileToBase64String: string;
  url: any;

  constructor(data: Partial<Photo>) {
    Object.assign(this, data, {
      fileToBase64String: 'data:image/jpg;base64,' + data.fileToBase64String
    });
  }

}

