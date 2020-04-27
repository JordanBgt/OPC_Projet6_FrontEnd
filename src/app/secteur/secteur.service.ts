import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  public ressourceUrl = 'http://localhost:8080/api/secteurs';

  constructor(protected http: HttpClient) { }

  getAllSecteurs(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecteur[]>(this.ressourceUrl, {params: options, observe: 'response'});
  }

  createSecteur(secteur: Secteur): Observable<EntityResponseType> {
    return this.http.post<ISecteur>(this.ressourceUrl, secteur, {observe: 'response'});
  }
}
