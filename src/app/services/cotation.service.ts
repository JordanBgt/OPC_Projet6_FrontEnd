import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICotation } from '../shared/model/cotation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotationService {

  public ressourceUrl = 'http://localhost:8080/api/cotations';

  constructor(protected http: HttpClient) { }

  getAllCotations(): Observable<ICotation[]> {
    return this.http.get<ICotation[]>(this.ressourceUrl);
  }

  getOneCotation(cotationId: number): Observable<ICotation> {
    return this.http.get<ICotation>(`${this.ressourceUrl}/${cotationId}`);
  }
}
