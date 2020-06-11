import { ICotation } from './cotation.model';
import { Photo } from './photo.model';

export class SpotLight {
  id?: number;
  country?: string;
  city?: string;
  official?: boolean;
  userId?: number;
  name?: string;
  cotationMin?: ICotation;
  cotationMax?: ICotation;
  photos?: Photo[];

  constructor(data: Partial<SpotLight>) {
    Object.assign(this, data, {
      photos: data.photos != null ? data.photos.length > 0 ? this.setPhotos(data.photos) : null : null
    });
  }

  setPhotos(photos: any): Photo[] {
    console.log('photos', photos);
    const photoArray = new Array<Photo>();
    photos.forEach(photo => {
      photoArray.push(new Photo(photo));
    });
    return photoArray;
  }
}

