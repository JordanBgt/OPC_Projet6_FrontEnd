import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../shared/model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public ressourceUrl = 'localhost:8080/api/'

  constructor(private httpClient: HttpClient) { }

  create(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.ressource)
  }
}
