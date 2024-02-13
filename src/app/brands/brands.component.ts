import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  BrandsContainer:any[] = [];
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
     this._ProductsService.GetBrands().subscribe({
      next:(response)=>{
        this.BrandsContainer = response.data
        console.log(this.BrandsContainer)
      }
    })
  }

}
