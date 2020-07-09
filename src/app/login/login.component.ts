import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { TokenStorageService } from '../security/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  url: string;
  subscriptions: Subscription[];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.pipe(
      tap(params => {
        this.url = params.url;
      })
    ).subscribe());

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    const user = new User();
    user.username = formValue.username;
    user.password = formValue.password;
    this.subscriptions.push(this.authService.login(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        setTimeout(() => {
          if (!!this.url) {
            window.location.replace(`http://localhost:4200${this.url}`);
          } else {
            window.location.replace('http://localhost:4200/home');
          }
        },
          500);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
