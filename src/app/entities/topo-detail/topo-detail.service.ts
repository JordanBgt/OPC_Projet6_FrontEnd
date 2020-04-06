import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITopo, Topo } from '../../shared/model/topo.model';
import { TopoSave } from '../../shared/model/topo-save.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

type EntityResponseType = HttpResponse<ITopo>;

@Injectable({
  providedIn: 'root'
})
export class TopoDetailService {

  public ressourceUrl = 'http://localhost:8080/api/topos';

  constructor(private http: HttpClient) { }

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
