import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SellerLayoutComponent } from './seller-layout.component';

export const SellerLayoutRoutingModule: Routes = [
  {  path: '',      component: HomePageComponent }
];

// export class SellerLayoutRoutingModule { }
