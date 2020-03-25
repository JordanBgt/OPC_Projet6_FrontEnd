import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICotation } from '../../shared/model/cotation.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ICotation>;
type EntityArrayResponseType = HttpResponse<ICotation[]>;

@Injectable({
  providedIn: 'root'
})
export class CotationService {

  public ressourceUrl = 'http://localhost:8080/api/cotations';

  constructor(protected http: HttpClient) { }

  getAllCotations(): Observable<EntityArrayResponseType> {
    return this.http.get<ICotation[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneCotation(cotationId: number): Observable<EntityResponseType> {
    return this.http.get<ICotation>(`${this.ressourceUrl}/${cotationId}`, {observe: 'response'});
  }
}
