import { ICotation } from './cotation.model';
import { Photo } from './photo.model';
export class Spot {
  id?: number;
  country?: string;
  city?: string;
  description?: string;
  official?: boolean;
  topoId?: number;
  photos?: Photo[];
  userId?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;

  constructor(data: Partial<Spot>) {
    Object.assign(this, data, {
      photos: data.photos != null ? data.photos.length > 0 ? this.setPhotos(data.photos) : null : null
    });
  }

  setPhotos(photos: any): Photo[] {
    const photoArray = new Array<Photo>();
    photos.forEach(photo => {
      photoArray.push(new Photo(photo));
    });
    return photoArray;
  }
}

