import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { TokenStorageService } from '../security/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

/**
 * Component to manage login actions
 */

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
              private route: ActivatedRoute) {
    this.subscriptions = [];
  }

  /**
   * When the component is initialized, we extract the url that the user wanted to visit before being redirected to the
   * login component, then we check if he is logged or not. If he isn't logged, we initialize the login form.
   */
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

  /**
   * It initializes the login form
   */
  initForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * When the form is submitted, we call the Authentication service to log the user and redirect him to the precedent
   * url if he was redirected to this page, or redirect him to the home page
   */
  onSubmit() {
    const formValue = this.form.value;
    const user = new User();
    user.username = formValue.username;
    user.password = formValue.password;
    this.subscriptions.push(
      this.authService.login(user).pipe(
        tap(res => {
          this.tokenStorage.saveToken(res.token);
          this.tokenStorage.saveUser(res);
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
        })
      ).subscribe());
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
