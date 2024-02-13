import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _ToastrService: ToastrService, private _AuthService: AuthService, private _Router: Router) { }

  isLoading: boolean = false;
  ApiError: string = '';

  RegisterForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,25}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,25}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]),
  })




  HandleRegister(RegisterForm: FormGroup) {

    this.isLoading = true;

    if (RegisterForm.valid) {
      this._AuthService.SignUpMethod(RegisterForm.value).subscribe({
        next: (Response) => {
          if (Response.message === 'success') {
            this.isLoading = false
            console.log('success'),
              this.SuccessToast()
            this._Router.navigate(['/login'])
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
    this._ToastrService?.success('Register Successfully!',);
    console.log('toster success')
  }

  ErrorToast() {
    this._ToastrService?.error('Register Failed Check Email May Be Used Before');
    console.log('toster error')
  }

}
