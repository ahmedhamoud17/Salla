import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _ToastrService: ToastrService, private _AuthService: AuthService, private _Router: Router) { }

  isLoading: boolean = false;
  ApiError: string = '';


  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,25}$/)]),
  })

  HandleLogin(LoginForm: FormGroup) {

    this.isLoading = true;

    if (LoginForm.valid) {
      this._AuthService.SignInMethod(LoginForm.value).subscribe({
        next: (Response) => {
          if (Response.message === 'success') {
            localStorage.setItem('UserToken', Response.token);
            this._AuthService.DecodedTokenMethod();
            // console.log(localStorage.getItem('UserToken'))
            this.isLoading = false
            console.log('success'),
              this.SuccessToast()
            this._Router.navigate(['/home'])
          }
        },

        error: (err) => {
          this.isLoading = false
          this.ApiError = err.error.message
          this.ErrorToast();
          console.log(this.ApiError)
        }
      })
    }
  }

  SuccessToast() {
    this._ToastrService?.success('Login Successfully!',);
    console.log('toster success')
  }

  ErrorToast() {
    this._ToastrService?.error('Login Failed Check Your Email Or Password');
    console.log('toster error')
  }

}
