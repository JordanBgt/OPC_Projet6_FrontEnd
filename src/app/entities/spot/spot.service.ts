import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISpot, Spot } from '../../shared/model/spot.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ISpot>;
type EntityArrayResponseType = HttpResponse<ISpot[]>;

@Injectable({
  providedIn: 'root'
})
export class SpotService {


  public ressourceUrl = 'localhost:8080/spots';

  constructor(protected http: HttpClient) { }

  getAllSpots(): Observable<EntityArrayResponseType> {
    return this.http.get<ISpot[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneSpot(spotId: number): Observable<EntityResponseType> {
    return this.http.get<ISpot>(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }

  createSpot(spot: Spot): Observable<EntityResponseType> {
    return this.http.post<ISpot>(this.ressourceUrl, spot, {observe: 'response'});
  }

  updateSpot(spot: Spot): Observable<EntityResponseType> {
    return this.http.put<ISpot>(`${this.ressourceUrl}/${spot.id}`, spot, {observe: 'response'});
  }

  deleteSpot(spotId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }
}
