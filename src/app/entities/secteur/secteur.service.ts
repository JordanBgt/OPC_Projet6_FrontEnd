import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Secteur } from '../../shared/model/secteur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<Secteur>;
type EntityArrayResponseType = HttpResponse<Secteur[]>;

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  public ressourceUrl = 'localhost:8080/secteurs';

  constructor(protected http: HttpClient) { }

  getAllSecteurs(): Observable<EntityArrayResponseType> {
    return this.http.get<Secteur[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneSecteur(secteurId: number): Observable<EntityResponseType> {
    return this.http.get<Secteur>(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }

  createSecteur(secteur: Secteur): Observable<EntityResponseType> {
    return this.http.post<Secteur>(this.ressourceUrl, secteur, {observe: 'response'});
  }

  updateSecteur(secteur: Secteur): Observable<EntityResponseType> {
    return this.http.put<Secteur>(`${this.ressourceUrl}/${secteur.id}`, secteur, {observe: 'response'});
  }

  deleteSecteur(secteurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }
}
