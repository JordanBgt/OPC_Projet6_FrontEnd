import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  public ressourceUrl = 'http://localhost:8080/api/secteurs';

  constructor(protected http: HttpClient) { }

  getAllSecteurs(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.ressourceUrl, {params: options});
  }

  createSecteur(secteur: Secteur): Observable<ISecteur> {
    return this.http.post<ISecteur>(this.ressourceUrl, secteur);
  }

  getOneSecteur(secteurId: number): Observable<ISecteur> {
    return this.http.get<ISecteur>(`${this.ressourceUrl}/${secteurId}`);
  }

  updateSecteur(secteur: Secteur, userId: number): Observable<ISecteur> {
    const options = createRequestOption({userId});
    return this.http.put<ISecteur>(`${this.ressourceUrl}/${secteur.id}`, secteur, {params: options});
  }

  deleteSecteur(secteurId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }
}
