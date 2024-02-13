import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
}) 
export class ProductdetailsComponent implements OnInit {

  IsLoading: boolean = false;
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private _ToastrService: ToastrService) { }



  Add(id: string) {
    this.IsLoading = true
    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        //numOfCartItems  
        this._CartService.numberOfCartItemsCount.next(res.numOfCartItems)
        console.log(res);
        this.SuccessToast()
        this.IsLoading = false
      },
      error: (err) => {
        console.log(err),
          this.ErrorToast()
        this.IsLoading = false
      }
    })
  }






  ProductId: any;
  ProductDetailsContainer: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.ProductId = params.get('id')
        console.log(this.ProductId)
      }
    });

    this._ProductsService.GetSpecificProduct(this.ProductId).subscribe({
      next: (response) => {
        this.ProductDetailsContainer = response.data
        console.log(this.ProductDetailsContainer)
      }
    })

  }

  SuccessToast() {
    this._ToastrService?.success('Product Add To Cart Successfully!',);
    console.log('toster success')
  }

  ErrorToast() {
    this._ToastrService?.error('Failed To Add Product To Cart Refresh Your Page');
    console.log('toster error')
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: true
  }

}
