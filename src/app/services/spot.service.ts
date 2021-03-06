import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Spot } from '../shared/model/spot.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';
import { API_URL } from '../../../app.constants';

/**
 * Service to send Spot requests to server
 */

@Injectable({
  providedIn: 'root'
})
export class SpotService {


  public ressourceUrl = API_URL + '/spots';

  constructor(protected http: HttpClient) { }

  getAllSpots(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.ressourceUrl, {params: options});
  }

  createSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(this.ressourceUrl, spot);
  }

  getOneSpot(spotId: number): Observable<Spot> {
    return this.http.get<Spot>(`${this.ressourceUrl}/${spotId}`);
  }

  updateSpot(spot: Spot, userId: number): Observable<Spot> {
    const options = createRequestOption({userId});
    return this.http.put<Spot>(`${this.ressourceUrl}/${spot.id}`, spot, {params: options});
  }

  deleteSpot(spotId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }

  uploadPhoto(file: File, fileName: string, spotId: number, spotUserId: number, userId: number): Observable<Spot> {
    const options = createRequestOption({spotUserId, userId});
    const formData = new FormData();
    formData.append('file', file, fileName);
    return this.http.post<Spot>(`${this.ressourceUrl}/${spotId}/photos`, formData, {params: options});
  }
}
