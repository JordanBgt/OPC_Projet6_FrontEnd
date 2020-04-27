import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

type EntityResponseType = HttpResponse<ISecteur>;

@Injectable({
  providedIn: 'root'
})
export class SecteurDetailService {

  public ressourceUrl = 'http://localhost:8080/api/secteurs';

  constructor(protected http: HttpClient) { }

  getOneSecteur(secteurId: number): Observable<EntityResponseType> {
    return this.http.get<ISecteur>(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }

  updateSecteur(secteur: Secteur, userId: number): Observable<EntityResponseType> {
    const options = createRequestOption({userId});
    return this.http.put<ISecteur>(`${this.ressourceUrl}/${secteur.id}`, secteur, {params: options, observe: 'response'});
  }

  deleteSecteur(secteurId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${secteurId}`, {observe: 'response'});
  }
}
