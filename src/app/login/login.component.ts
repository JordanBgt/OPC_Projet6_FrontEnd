import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { TokenStorageService } from '../security/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    this.authService.login(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        setTimeout(() => {
          window.location.replace('http://localhost:4200/home');
        },
          500);
      }
    );
  }
}
