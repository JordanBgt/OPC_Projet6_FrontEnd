import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITopo, Topo } from '../shared/model/topo.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';
import { ITopoLight } from '../shared/model/topo-light.model';

type EntityResponseType = HttpResponse<ITopo>;
type EntityArrayResponseType = HttpResponse<ITopoLight[]>;

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  public ressourceUrl = 'http://localhost:8080/api/topos';

  constructor(private http: HttpClient) {}

  getAllTopos(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITopoLight[]>(this.ressourceUrl, {params: options, observe: 'response'});
  }

  createTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.post<ITopo>(this.ressourceUrl, topo, {observe: 'response'});
  }

  getOneTopo(topoId: number): Observable<EntityResponseType> {
    return this.http.get<ITopo>(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  updateTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.put<ITopo>(`${this.ressourceUrl}/${topo.id}`, topo, {observe: 'response'});
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }
}
