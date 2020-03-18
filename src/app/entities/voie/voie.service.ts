import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../../shared/model/voie.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IVoie>;
type EntityArrayResponseType = HttpResponse<IVoie[]>;

@Injectable({
  providedIn: 'root'
})
export class VoieService {

  public ressourceUrl = 'http://localhost:8080/voies';

  constructor(protected http: HttpClient) { }

  getAllVoies(): Observable<EntityArrayResponseType> {
    return this.http.get<IVoie[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneVoie(voieId: number): Observable<EntityResponseType> {
    return this.http.get<IVoie>(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }

  createVoie(voie: Voie): Observable<EntityResponseType> {
    return this.http.post<IVoie>(this.ressourceUrl, voie, {observe: 'response'});
  }

  updateVoie(voie: Voie): Observable<EntityResponseType> {
    return this.http.put<IVoie>(`${this.ressourceUrl}/${voie.id}`, voie, {observe: 'response'});
  }

  deleteVoie(voieId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }
}
