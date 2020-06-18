import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user.model';
import { TokenStorageService } from '../security/token-storage.service';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userConnected: any;
  isLoggedIn: boolean;
  user: User = new User();

  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userConnected = this.tokenStorageService.getUser();
    this.loadUser();
  }

  loadUser() {
    this.userService.getOneUser(this.userConnected.id).pipe(
      tap((res: any) => {
        this.user.userForProfilUtilisation(res);
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

}
