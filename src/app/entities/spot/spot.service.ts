import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Spot } from '../../shared/model/spot.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<Spot>;
type EntityArrayResponseType = HttpResponse<Spot[]>;

@Injectable({
  providedIn: 'root'
})
export class SpotService {


  public ressourceUrl = 'localhost:8080/spots';

  constructor(protected http: HttpClient) { }

  getAllSpots(): Observable<EntityArrayResponseType> {
    return this.http.get<Spot[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneSpot(spotId: number): Observable<EntityResponseType> {
    return this.http.get<Spot>(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }

  createSpot(spot: Spot): Observable<EntityResponseType> {
    return this.http.post<Spot>(this.ressourceUrl, spot, {observe: 'response'});
  }

  updateSpot(spot: Spot): Observable<EntityResponseType> {
    return this.http.put<Spot>(`${this.ressourceUrl}/${spot.id}`, spot, {observe: 'response'});
  }

  deleteSpot(spotId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${spotId}`, {observe: 'response'});
  }
}
