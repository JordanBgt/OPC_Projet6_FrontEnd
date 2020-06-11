import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Topo } from '../shared/model/topo.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  public ressourceUrl = 'http://localhost:8080/api/topos';

  constructor(private http: HttpClient) {}

  getAllTopos(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.ressourceUrl, {params: options});
  }

  createTopo(topo: Topo): Observable<Topo> {
    return this.http.post<Topo>(this.ressourceUrl, topo);
  }

  getOneTopo(topoId: number): Observable<Topo> {
    return this.http.get<any>(`${this.ressourceUrl}/${topoId}`);
  }

  updateTopo(topo: Topo): Observable<Topo> {
    return this.http.put<Topo>(`${this.ressourceUrl}/${topo.id}`, topo);
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  uploadPhoto(file: File, fileName: string, topoId: number): Observable<Topo> {
    const formData = new FormData();
    formData.append('file', file, fileName);
    return this.http.post<Topo>(`${this.ressourceUrl}/${topoId}/photos`, formData);
  }
}
