import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Topo } from '../shared/model/topo.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';

type EntityResponseType = HttpResponse<Topo>;

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

  createTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.post<Topo>(this.ressourceUrl, topo, {observe: 'response'});
  }

  getOneTopo(topoId: number): Observable<EntityResponseType> {
    return this.http.get<Topo>(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  updateTopo(topo: Topo): Observable<EntityResponseType> {
    return this.http.put<Topo>(`${this.ressourceUrl}/${topo.id}`, topo, {observe: 'response'});
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  uploadPhoto(file: File, fileName: string, topoId: number): void {
    const formData = new FormData();
    formData.append('file', file, fileName);
    this.http.post(`${this.ressourceUrl}/${topoId}/photos`, formData).subscribe();
  }
}
