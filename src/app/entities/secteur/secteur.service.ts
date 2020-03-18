import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISecteur, Secteur } from '../../shared/model/secteur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  public ressourceUrl = 'http://localhost:8080/secteurs';

  constructor(protected http: HttpClient) { }

  getAllSecteurs(): Observable<EntityArrayResponseType> {
    return this.http.get<ISecteur[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneSecteur(secteurId: number): Observable<EntityResponseType> {
    return this.http.get<ISecteur>(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }

  createSecteur(secteur: Secteur): Observable<EntityResponseType> {
    return this.http.post<ISecteur>(this.ressourceUrl, secteur, {observe: 'response'});
  }

  updateSecteur(secteur: Secteur): Observable<EntityResponseType> {
    return this.http.put<ISecteur>(`${this.ressourceUrl}/${secteur.id}`, secteur, {observe: 'response'});
  }

  deleteSecteur(secteurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }
}
