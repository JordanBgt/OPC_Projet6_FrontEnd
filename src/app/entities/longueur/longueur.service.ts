import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ILongueur, Longueur } from '../../shared/model/longueur.model';
import { Observable } from 'rxjs';
import { LongueurSave } from '../../shared/model/longueur-save.model';
import { createRequestOption } from '../../shared/request-utils';

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

  createLongueur(longueur: LongueurSave): Observable<EntityResponseType> {
    return this.http.post<ILongueur>(this.ressourceUrl, longueur, {observe: 'response'});
  }
}
