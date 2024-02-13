import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  CartContainer: any = null
  isLoading: boolean = false;
  constructor(private _CartService: CartService, private _ToastrService: ToastrService , private _Router:Router) {
   }



  UpdateCartCount(id: string, count: number) {
    this._CartService.UpdateCartItemQuantity(id, count).subscribe({
      next: (res) => {
        this.CartContainer = res.data
        this.SuccessAddToast()
        console.log(res.data)
      },
      error: (err) => {
        console.log(err)

      }
    })
  }


  RemoveItem(id: string) {
    this._CartService.DeleteCartItem(id).subscribe({
      next: (res) => {
        this.SuccessToast()
        this.CartContainer = res.data
        console.log(res.data)
      },
      error: (err) => {
        this.ErrorToast();
        console.log(err)

      }
    })

  }

  ngOnInit(): void {
    this._CartService.GetUserCart().subscribe({
      next: (res) => {
        this.CartContainer = res.data
        console.log(this.CartContainer)
      },
      error: (err) => { console.log(err) }
    })
  }


  SuccessToast() {
    this._ToastrService?.warning('Item Removed Successfully!',);
    console.log('toster success')
  }

  ErrorToast() {
    this._ToastrService?.error('Failed To Remove Item');
    console.log('toster error')
  }

  SuccessAddToast() {
    this._ToastrService?.success('Item Count Successfully!',);
    console.log('toster success')
  }


  NavigateToCheckSession(){
    this._Router.navigate(['/checksession'])
  }


}
