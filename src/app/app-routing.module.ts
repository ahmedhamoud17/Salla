import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth.guard';
import { ChecksessionComponent } from './checksession/checksession.component';
import { AllordersComponent } from './allorders/allorders.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'brands', component:BrandsComponent},
  {path:'checksession',canActivate:[authGuard] , component:ChecksessionComponent},
  {path:'allorders',canActivate:[authGuard] , component:AllordersComponent},
  {path:'register' , component:RegisterComponent},
  {path:'login' , component:LoginComponent},
  {path:'products', component:ProductsComponent},
  {path:'productsdetails/:id',canActivate:[authGuard] , component:ProductdetailsComponent},
  {path:'category', component:CategoryComponent},
  {path:'cart',canActivate:[authGuard] , component:CartComponent},
  {path:'**' , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
