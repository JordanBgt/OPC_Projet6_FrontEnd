import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public ressourceUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  getOneUser(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.ressourceUrl}/${userId}`);
  }

}
