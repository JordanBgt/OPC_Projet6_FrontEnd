import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILongueur, Longueur } from '../shared/model/longueur.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

@Injectable({
  providedIn: 'root'
})
export class LongueurService {

  public ressourceUrl = 'http://localhost:8080/api/longueurs';

  constructor(protected http: HttpClient) { }

  getAllLongueurs(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.ressourceUrl, {params: options});
  }

  createLongueur(longueur: Longueur): Observable<ILongueur> {
    return this.http.post<ILongueur>(this.ressourceUrl, longueur);
  }

  getOneLongueur(longueurId: number): Observable<ILongueur> {
    return this.http.get<ILongueur>(`${this.ressourceUrl}/${longueurId}`);
  }

  updateLongueur(longueur: Longueur, userId): Observable<ILongueur> {
    const options = createRequestOption({userId});
    return this.http.put<ILongueur>(`${this.ressourceUrl}/${longueur.id}`, longueur, {params: options});
  }

  deleteLongueur(longueurId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${longueurId}`, {observe: 'response'});
  }
}
