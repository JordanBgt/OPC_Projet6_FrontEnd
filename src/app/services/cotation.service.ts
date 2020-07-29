import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICotation } from '../shared/model/cotation.model';
import { Observable } from 'rxjs';
import { API_URL } from '../../../app.constants';

/**
 * Service to send Cotation request to server
 */

@Injectable({
  providedIn: 'root'
})
export class CotationService {

  public ressourceUrl = API_URL + '/cotations';

  constructor(protected http: HttpClient) { }

  getAllCotations(): Observable<ICotation[]> {
    return this.http.get<ICotation[]>(this.ressourceUrl);
  }
}
