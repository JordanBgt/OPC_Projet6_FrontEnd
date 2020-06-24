import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../shared/model/user-profile.model';
import { createRequestOption } from '../shared/request-utils';
import { TopoUser } from '../shared/model/topo-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  public ressourceUrl = 'http://localhost:8080/api/profile';

  constructor(private readonly http: HttpClient) { }

  getUserProfile(userId: number): Observable<UserProfile> {
    const options = createRequestOption({userId});
    return this.http.get<UserProfile>(this.ressourceUrl, {params: options});
  }

  bookTopo(topoUser: TopoUser): Observable<TopoUser> {
    return this.http.post<TopoUser>(`${this.ressourceUrl}/bookings`, topoUser);
  }
}
