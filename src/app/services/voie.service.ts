import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../shared/model/voie.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';
import { API_URL } from '../../../app.constants';

/**
 * Service to send Voie requests to server
 */

@Injectable({
  providedIn: 'root'
})
export class VoieService {

  public ressourceUrl = API_URL + '/voies';

  constructor(protected http: HttpClient) { }

  getAllVoies(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.ressourceUrl, {params: options});
  }

  createVoie(voie: Voie): Observable<IVoie> {
    return this.http.post<IVoie>(this.ressourceUrl, voie);
  }

  getOneVoie(voieId: number): Observable<IVoie> {
    return this.http.get<IVoie>(`${this.ressourceUrl}/${voieId}`);
  }

  updateVoie(voie: Voie, userId: number): Observable<IVoie> {
    const options = createRequestOption({userId});
    return this.http.put<IVoie>(`${this.ressourceUrl}/${voie.id}`, voie, {params: options});
  }

  deleteVoie(voieId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${voieId}`, {observe: 'response'});
  }
}
