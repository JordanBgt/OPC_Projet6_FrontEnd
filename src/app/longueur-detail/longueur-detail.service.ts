import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ILongueur, Longueur } from '../shared/model/longueur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ILongueur>;

@Injectable({
  providedIn: 'root'
})
export class LongueurDetailService {

  public ressourceUrl = 'http://localhost:8080/api/longueurs';

  constructor(private http: HttpClient) { }

  getOneLongueur(longueurId: number): Observable<EntityResponseType> {
    return this.http.get<ILongueur>(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }

  updateLongueur(longueur: Longueur): Observable<EntityResponseType> {
    return this.http.put<ILongueur>(`${this.ressourceUrl}/${longueur.id}`, longueur, {observe: 'response'});
  }

  deleteLongueur(longueurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }
}
