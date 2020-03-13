import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Longueur } from '../../shared/model/longueur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<Longueur>;
type EntityArrayResponseType = HttpResponse<Longueur[]>;

@Injectable({
  providedIn: 'root'
})
export class LongueurService {

  public ressourceUrl = 'localhost:8080/longueurs';

  constructor(protected http: HttpClient) { }

  getAllLongueurs(): Observable<EntityArrayResponseType> {
    return this.http.get<Longueur[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneLongueur(longueurId: number): Observable<EntityResponseType> {
    return this.http.get<Longueur>(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }

  createLongueur(longueur: Longueur): Observable<EntityResponseType> {
    return this.http.post<Longueur>(this.ressourceUrl, longueur, {observe: 'response'});
  }

  updateLongueur(longueur: Longueur): Observable<EntityResponseType> {
    return this.http.put<Longueur>(`${this.ressourceUrl}/${longueur.id}`, longueur, {observe: 'response'});
  }

  deleteLongueur(longueurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }
}
