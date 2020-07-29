import { HttpParams } from '@angular/common/http';

/**
 * Method which allows to create Http params with pairs of key value
 * @param req pairs of key value
 */
export const createRequestOption = (req?: any): HttpParams => {
  let options = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (req[key] !== null && req[key] !== undefined) {
        options = options.set(key, req[key]);
      }
    });
  }
  return options;
};

