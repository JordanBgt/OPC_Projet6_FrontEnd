import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../security/auth.service';
import { User } from '../shared/model/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSuccessful = false;
  isSignupFailed = false;
  errorMessage = '';
  registerSubscription: Subscription;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    const user = new User();
    user.username = formValue.username;
    user.email = formValue.email;
    user.password = formValue.password;
    this.registerSubscription = this.authService.register(user).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignupFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignupFailed = true;
      }
    );
  }

  ngOnDestroy(): void {
    if (!!this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

}
