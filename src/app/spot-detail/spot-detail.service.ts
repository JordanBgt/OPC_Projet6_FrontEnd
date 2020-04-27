import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpot, Spot } from '../shared/model/spot.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { createRequestOption } from '../shared/request-utils';
import { TokenStorageService } from '../security/token-storage.service';

type EntityResponseType = HttpResponse<ISpot>;

@Injectable({
  providedIn: 'root'
})
export class SpotDetailService {

  public ressourceUrl = 'http://localhost:8080/api/spots';

  constructor(private http: HttpClient) { }

  getOneSpot(spotId: number): Observable<EntityResponseType> {
    return this.http.get<ISpot>(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }

  updateSpot(spot: Spot, userId: number): Observable<EntityResponseType> {
    const options = createRequestOption({userId});
    return this.http.put<ISpot>(`${this.ressourceUrl}/${spot.id}`, spot, {params: options, observe: 'response'});
  }

  deleteSpot(spotId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }
}
