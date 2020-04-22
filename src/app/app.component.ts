import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './security/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'escalade';
  private roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    console.log('LOGGEDIN ? : ' + this.isLoggedIn);
  }

  logout() {
    this.tokenStorageService.signout();
    this.isLoggedIn = false;
  }
}
