import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Topo } from '../shared/model/topo.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';
import { TopoUser } from '../shared/model/topo-user.model';
import { API_URL } from '../../../app.constants';

/**
 * Service to send Topo requests to server
 */

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  public ressourceUrl = API_URL + '/topos';

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

  updateTopo(topo: Topo, userId: number): Observable<Topo> {
    const options = createRequestOption({userId});
    return this.http.put<Topo>(`${this.ressourceUrl}/${topo.id}`, topo, {params: options});
  }

  deleteTopo(topoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.ressourceUrl}/${topoId}`, {observe: 'response'});
  }

  uploadPhoto(file: File, fileName: string, topoId: number, topoCreatorId: number, userId: number): Observable<Topo> {
    const options = createRequestOption({topoCreatorId, userId});
    const formData = new FormData();
    formData.append('file', file, fileName);
    return this.http.post<Topo>(`${this.ressourceUrl}/${topoId}/photos`, formData, {params: options});
  }

  bookTopo(topoId: number, topoUser: TopoUser): Observable<TopoUser> {
    return this.http.post<TopoUser>(`${this.ressourceUrl}/${topoId}/bookings`, topoUser);
  }
}
