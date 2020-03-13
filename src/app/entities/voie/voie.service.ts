import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Voie } from '../../shared/model/voie.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<Voie>;
type EntityArrayResponseType = HttpResponse<Voie[]>;

@Injectable({
  providedIn: 'root'
})
export class VoieService {

  public ressourceUrl = 'localhost:8080/voies';

  constructor(protected http: HttpClient) { }

  getAllVoies(): Observable<EntityArrayResponseType> {
    return this.http.get<Voie[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneVoie(voieId: number): Observable<EntityResponseType> {
    return this.http.get<Voie>(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }

  createVoie(voie: Voie): Observable<EntityResponseType> {
    return this.http.post<Voie>(this.ressourceUrl, voie, {observe: 'response'});
  }

  updateVoie(voie: Voie): Observable<EntityResponseType> {
    return this.http.put<Voie>(`${this.ressourceUrl}/${voie.id}`, voie, {observe: 'response'});
  }

  deleteVoie(voieId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }
}
