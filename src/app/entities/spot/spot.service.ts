import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISpot, Spot } from '../../shared/model/spot.model';
import { Observable } from 'rxjs';
import { SpotSave } from '../../shared/model/spot-save.model';

type EntityResponseType = HttpResponse<ISpot>;
type EntityArrayResponseType = HttpResponse<ISpot[]>;

@Injectable({
  providedIn: 'root'
})
export class SpotService {


  public ressourceUrl = 'http://localhost:8080/api/spots';

  constructor(protected http: HttpClient) { }

  getAllSpots(): Observable<EntityArrayResponseType> {
    return this.http.get<ISpot[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneSpot(spotId: number): Observable<EntityResponseType> {
    return this.http.get<ISpot>(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }

  createSpot(spot: SpotSave): Observable<EntityResponseType> {
    return this.http.post<ISpot>(this.ressourceUrl, spot, {observe: 'response'});
  }

  updateSpot(spot: SpotSave, spotId: number): Observable<EntityResponseType> {
    return this.http.put<ISpot>(`${this.ressourceUrl}/${spotId}`, spot, {observe: 'response'});
  }

  deleteSpot(spotId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }
}
