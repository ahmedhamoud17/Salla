import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin: boolean = false
  NumCartItem:number = 0

  LogOut(){
    this._AuthService.LogOutMethod()
  }

  constructor(private _AuthService: AuthService , private _CartService:CartService) {


    _CartService.numberOfCartItemsCount.subscribe({
      next:(value)=>{this.NumCartItem = value}
    })

    _AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() !== null) {
          this.isLogin = true
        }
        else {
          this.isLogin = false
        }
      }
    })}

  

}
