import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ILongueur, Longueur } from '../../shared/model/longueur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ILongueur>;
type EntityArrayResponseType = HttpResponse<ILongueur[]>;

@Injectable({
  providedIn: 'root'
})
export class LongueurService {

  public ressourceUrl = 'localhost:8080/longueurs';

  constructor(protected http: HttpClient) { }

  getAllLongueurs(): Observable<EntityArrayResponseType> {
    return this.http.get<ILongueur[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneLongueur(longueurId: number): Observable<EntityResponseType> {
    return this.http.get<ILongueur>(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }

  createLongueur(longueur: Longueur): Observable<EntityResponseType> {
    return this.http.post<ILongueur>(this.ressourceUrl, longueur, {observe: 'response'});
  }

  updateLongueur(longueur: Longueur): Observable<EntityResponseType> {
    return this.http.put<ILongueur>(`${this.ressourceUrl}/${longueur.id}`, longueur, {observe: 'response'});
  }

  deleteLongueur(longueurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }
}
