import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ILongueur, Longueur } from '../shared/model/longueur.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

type EntityResponseType = HttpResponse<ILongueur>;
type EntityArrayResponseType = HttpResponse<ILongueur[]>;

@Injectable({
  providedIn: 'root'
})
export class LongueurService {

  public ressourceUrl = 'http://localhost:8080/api/longueurs';

  constructor(protected http: HttpClient) { }

  getAllLongueurs(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILongueur[]>(this.ressourceUrl, {params: options, observe: 'response'});
  }

  createLongueur(longueur: Longueur): Observable<EntityResponseType> {
    return this.http.post<ILongueur>(this.ressourceUrl, longueur, {observe: 'response'});
  }

  getOneLongueur(longueurId: number): Observable<EntityResponseType> {
    return this.http.get<ILongueur>(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }

  updateLongueur(longueur: Longueur, userId): Observable<EntityResponseType> {
    const options = createRequestOption({userId});
    return this.http.put<ILongueur>(`${this.ressourceUrl}/${longueur.id}`, longueur, {params: options, observe: 'response'});
  }

  deleteLongueur(longueurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }
}
