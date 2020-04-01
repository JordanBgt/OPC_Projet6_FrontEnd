import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../../shared/model/voie.model';
import { Observable } from 'rxjs';
import { VoieSave } from '../../shared/model/voie-save.model';

type EntityResponseType = HttpResponse<IVoie>;
type EntityArrayResponseType = HttpResponse<IVoie[]>;

@Injectable({
  providedIn: 'root'
})
export class VoieService {

  public ressourceUrl = 'http://localhost:8080/api/voies';

  constructor(protected http: HttpClient) { }

  getAllVoies(): Observable<EntityArrayResponseType> {
    return this.http.get<IVoie[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneVoie(voieId: number): Observable<EntityResponseType> {
    return this.http.get<IVoie>(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }

  createVoie(voie: VoieSave): Observable<EntityResponseType> {
    return this.http.post<IVoie>(this.ressourceUrl, voie, {observe: 'response'});
  }

  updateVoie(voie: VoieSave, voieId: number): Observable<EntityResponseType> {
    return this.http.put<IVoie>(`${this.ressourceUrl}/${voieId}`, voie, {observe: 'response'});
  }

  deleteVoie(voieId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }
}
