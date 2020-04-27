import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../shared/model/voie.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

type EntityResponseType = HttpResponse<IVoie>;

@Injectable({
  providedIn: 'root'
})
export class VoieDetailService {

  public ressourceUrl = 'http://localhost:8080/api/voies';

  constructor(private http: HttpClient) { }

  getOneVoie(voieId: number): Observable<EntityResponseType> {
    return this.http.get<IVoie>(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }

  updateVoie(voie: Voie, userId: number): Observable<EntityResponseType> {
    const options = createRequestOption({userId});
    return this.http.put<IVoie>(`${this.ressourceUrl}/${voie.id}`, voie, {params: options, observe: 'response'});
  }

  deleteVoie(voieId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }
}
