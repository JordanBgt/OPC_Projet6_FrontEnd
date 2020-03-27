import { HttpParams } from '@angular/common/http';

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

