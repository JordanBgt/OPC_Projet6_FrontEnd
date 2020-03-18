import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITopo, Topo } from '../../shared/model/topo.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ITopo>;
type EntityArrayResponseType = HttpResponse<ITopo[]>;

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  public ressourceUrl = 'http://localhost:8080/api/topos';

  constructor(private http: HttpClient) {}

  getAllTopos(): Observable<EntityArrayResponseType> {
    return this.http.get<ITopo[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneTopo(topoId: number): Observable<EntityResponseType> {
    return this.http.get<ITopo>(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  createTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.post<ITopo>(this.ressourceUrl, topo, {observe: 'response'});
  }

  updateTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.put<ITopo>(`${this.ressourceUrl}/${topo.id}`, topo, {observe: 'response'});
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }
}
