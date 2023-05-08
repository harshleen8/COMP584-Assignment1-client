import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { LoginResult } from './login-result';
import { LoginRequest } from './login-request';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  form!: UntypedFormGroup;
  loginResult!: LoginResult;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    var loginRequest = <LoginRequest>{
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    };

    this.authService.login(loginRequest).subscribe({
      next: result => {
        console.log(result);
        this.loginResult = result;
        if (result.success) {
          localStorage.setItem(this.authService.tokenKey, result.token);
          this.router.navigate(["/"]);
          this.alertify.success('You are successfully logged in');
        }
      },
      error: error => {
        console.log(error);
        if (error.status == 401) {
          loginRequest = error.error;
          this.alertify.error('Invalid username or password');
        }
    }});
  }
}
