import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  numberOfCartItemsCount = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) {
    this.GetUserCart().subscribe({
      next: (res) => {
        this.numberOfCartItemsCount.next(res.numOfCartItems)
        console.log(this.numberOfCartItemsCount)
      },
      error: (err) => { console.log(err) }
    })
  }

  headers: any = {
    token: localStorage.getItem('UserToken')
  }

  AddToCart(productId: string): Observable<any> {

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId }, { headers: this.headers }
    )
  }

  GetUserCart(): Observable<any> {

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: this.headers }
    )
  }

  DeleteCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: this.headers })
  }

  UpdateCartItemQuantity(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: count }, { headers: this.headers })
  }

  OnlinePayment(shippingAddress: any, CartId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:4200`, { shippingAddress: shippingAddress }, { headers: this.headers })
  }
 
 
}
