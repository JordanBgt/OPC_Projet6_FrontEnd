import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Topo } from '../../shared/model/topo.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<Topo>;
type EntityArrayResponseType = HttpResponse<Topo[]>;

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  public ressourceUrl = 'localhost:8080/topos';

  constructor(private http: HttpClient) {}

  getAllTopos(): Observable<EntityArrayResponseType> {
    return this.http.get<Topo[]>(this.ressourceUrl, {observe: 'response'});
  }

  getOneTopo(topoId: number): Observable<EntityResponseType> {
    return this.http.get<Topo>(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  createTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.post<Topo>(this.ressourceUrl, topo, {observe: 'response'});
  }

  updateTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.put<Topo>(`${this.ressourceUrl}/${topo.id}`, topo, {observe: 'response'});
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }
}
