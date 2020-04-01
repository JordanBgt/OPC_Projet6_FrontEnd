import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ILongueur, Longueur } from '../../shared/model/longueur.model';
import { Observable } from 'rxjs';
import { LongueurSave } from '../../shared/model/longueur-save.model';

type EntityResponseType = HttpResponse<ILongueur>;
type EntityArrayResponseType = HttpResponse<ILongueur[]>;

@Injectable({
  providedIn: 'root'
})
export class LongueurService {

  public ressourceUrl = 'http://localhost:8080/api/longueurs';

  constructor(protected http: HttpClient) { }

  getAllLongueurs(): Observable<EntityArrayResponseType> {
    return this.http.get<ILongueur[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneLongueur(longueurId: number): Observable<EntityResponseType> {
    return this.http.get<ILongueur>(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }

  createLongueur(longueur: LongueurSave): Observable<EntityResponseType> {
    return this.http.post<ILongueur>(this.ressourceUrl, longueur, {observe: 'response'});
  }

  updateLongueur(longueur: LongueurSave, longueurId: number): Observable<EntityResponseType> {
    return this.http.put<ILongueur>(`${this.ressourceUrl}/${longueurId}`, longueur, {observe: 'response'});
  }

  deleteLongueur(longueurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }
}
