import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITopo } from '../../shared/model/topo.model';
import { Observable } from 'rxjs';
import { TopoSave } from '../../shared/model/topoSave.model';
import { createRequestOption } from '../../shared/request-utils';

type EntityResponseType = HttpResponse<ITopo>;
type EntityArrayResponseType = HttpResponse<ITopo[]>;

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  public ressourceUrl = 'http://localhost:8080/api/topos';

  constructor(private http: HttpClient) {}

  getAllTopos(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITopo[]>(this.ressourceUrl, {params: options, observe: 'response'});
  }

  getOneTopo(topoId: number): Observable<EntityResponseType> {
    return this.http.get<ITopo>(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  createTopo(topo: TopoSave): Observable<EntityResponseType> {
    return this.http.post<ITopo>(this.ressourceUrl, topo, {observe: 'response'});
  }

  updateTopo(topo: TopoSave, topoId: number): Observable<EntityResponseType> {
    return this.http.put<ITopo>(`${this.ressourceUrl}/${topoId}`, topo, {observe: 'response'});
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }
}
