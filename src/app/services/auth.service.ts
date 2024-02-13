import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('UserToken') !== null) {
      this.DecodedTokenMethod()
    }
  }

  SignUpMethod(userData: object): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
  }

  SignInMethod(userData: object): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }

  DecodedTokenMethod() {
    let encodedToken = JSON.stringify(localStorage.getItem('UserToken'))
    let decodedToken: any = jwtDecode(encodedToken)
    this.userData.next(decodedToken)
    console.log(this.userData)
  }

  LogOutMethod() {
    localStorage.removeItem('UserToken')
    this.userData.next(null);
    this._Router.navigate(['/login'])
  }


}
