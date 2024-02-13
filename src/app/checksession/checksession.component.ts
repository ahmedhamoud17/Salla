import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';



@Component({
  selector: 'app-checksession',
  templateUrl: './checksession.component.html',
  styleUrl: './checksession.component.css'
})
export class ChecksessionComponent {

  CartId:string = ''

  constructor(private _CartService: CartService) {
    _CartService.GetUserCart().subscribe({
      next:(res) =>{this.CartId = res.data._id}
    })
   }
  isLoading:boolean = false

  OnlinePayForm: FormGroup = new FormGroup({
    "   ": new FormControl(null , [Validators.required]),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0-9]{9}$/)]),
    city: new FormControl(null , [ Validators.required]),
  })


  NavigateToStripePage(url:string){
    window.location.href = url;
  }

  OnlinePay(OnlinePayForm: FormGroup) {
    this.isLoading = true
    this._CartService.OnlinePayment(OnlinePayForm.value, this.CartId).subscribe({
      next:(res) => {
        this.isLoading = false,
        console.log(res)
        this.NavigateToStripePage(res.session.url)
        
      },
      error:(err) => {
        this.isLoading = false
        console.log(err)}
    })
  }

}
