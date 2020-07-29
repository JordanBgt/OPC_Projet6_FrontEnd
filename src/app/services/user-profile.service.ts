import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../shared/model/user-profile.model';
import { createRequestOption } from '../shared/request-utils';
import { TopoUser } from '../shared/model/topo-user.model';
import { API_URL } from '../../../app.constants';

/**
 * Service to send UserProfile requests to server
 */

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  public ressourceUrl = API_URL + '/profile';

  constructor(private readonly http: HttpClient) { }

  getUserProfile(userId: number): Observable<UserProfile> {
    const options = createRequestOption({userId});
    return this.http.get<UserProfile>(this.ressourceUrl, {params: options});
  }

  updateTopoUser(topoUser: TopoUser): Observable<TopoUser> {
    return this.http.post<TopoUser>(`${this.ressourceUrl}/bookings`, topoUser);
  }

  createTopoUser(topoUser: TopoUser): Observable<TopoUser> {
    return this.http.post<TopoUser>(`${this.ressourceUrl}/topos`, topoUser);
  }
}
