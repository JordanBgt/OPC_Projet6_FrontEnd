import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITopo } from '../../shared/model/topo.model';
import { Observable } from 'rxjs';
import { TopoSave } from '../../shared/model/topo-save.model';
import { createRequestOption } from '../../shared/request-utils';
import { ITopoLight } from '../../shared/model/topo-light.model';

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

  createTopo(topo: TopoSave): Observable<EntityResponseType> {
    return this.http.post<ITopo>(this.ressourceUrl, topo, {observe: 'response'});
  }
}
