import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ISpot } from '../shared/model/spot.model';
import { Observable } from 'rxjs';
import { SpotSave } from '../shared/model/spot-save.model';
import { ISpotLight } from '../shared/model/spot-light.model';
import { createRequestOption } from '../shared/request-utils';

type EntityResponseType = HttpResponse<ISpot>;
type EntityArrayResponseType = HttpResponse<ISpotLight[]>;

@Injectable({
  providedIn: 'root'
})
export class SpotService {


  public ressourceUrl = 'http://localhost:8080/api/spots';

  constructor(protected http: HttpClient) { }

  getAllSpots(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISpotLight[]>(this.ressourceUrl, {params: options, observe: 'response'});
  }

  createSpot(spot: SpotSave): Observable<EntityResponseType> {
    return this.http.post<ISpot>(this.ressourceUrl, spot, {observe: 'response'});
  }
}
