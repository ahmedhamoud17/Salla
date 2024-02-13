import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  constructor(private _ProductsService: ProductsService) { }

  ProductsCategoryContainer: any[] = [];

  ngOnInit(): void {
    this._ProductsService.GetCategories().subscribe({
      next: (response) => {
        this.ProductsCategoryContainer = response.data;
        console.log(this.ProductsCategoryContainer)
      }
    })
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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
