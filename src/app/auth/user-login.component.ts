import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  loginResult!: LoginResult;
  form!: FormGroup;
  showChangePassword: boolean = false;
  showResetPassword: boolean = false;
  showForgotPasswordLink: boolean = true;
  showChangePasswordLink: boolean = true;

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      currentPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [null, Validators.required],
      resetPasswordEmail: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const loginRequest: LoginRequest = {
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value,
      token: ''
    };

    this.authService.login(loginRequest).subscribe(
      result => {
        console.log(result);
        this.loginResult = result;
        if (result.success) {
          localStorage.setItem(this.authService.tokenKey, result.token);
          this.alertify.success('You are successfully logged in');
          this.router.navigate(['/']); // Redirect to home page
        }
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          this.alertify.error('Invalid username or password');
        }
      }
    );
  }

  onShowResetPassword(): void {
    this.showResetPassword = true;
    this.showForgotPasswordLink = false;
    this.showChangePassword = false;
    this.showChangePasswordLink = true;
    this.resetForm();
  }

  onResetPassword(): void {
    if (this.form.controls['resetPasswordEmail'].valid) {
      const resetPasswordEmail = this.form.controls['resetPasswordEmail'].value;
      // Perform password reset action (e.g., send reset password email)
      console.log('Reset password email submitted:', resetPasswordEmail);
      this.resetForm();
    }
  }

  onShowChangePassword(): void {
    this.showChangePassword = true;
    this.showChangePasswordLink = false;
    this.showResetPassword = false;
    this.showForgotPasswordLink = true;
    this.resetForm();
  }

  onChangePassword(): void {
    if (this.form.valid && this.form.controls['newPassword'].value === this.form.controls['confirmNewPassword'].value) {
      const currentPassword = this.form.controls['currentPassword'].value;
      const newPassword = this.form.controls['newPassword'].value;
      // Perform password change action
      console.log('Change password submitted:', currentPassword, newPassword);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.form.reset();
    this.form.controls['userName'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.form.controls['currentPassword'].setErrors(null);
    this.form.controls['newPassword'].setErrors(null);
    this.form.controls['confirmNewPassword'].setErrors(null);
    this.form.controls['resetPasswordEmail'].setErrors(null);
  }
}
