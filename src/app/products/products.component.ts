import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  ProductsConatiner:any[] = [];
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    this._ProductsService.GetProducts().subscribe({
      next:(response)=>{
        this.ProductsConatiner = response.data;
        console.log(this.ProductsConatiner)
      }
    })
  }

}
