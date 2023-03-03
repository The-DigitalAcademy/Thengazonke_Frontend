import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../shared/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { RateComponent } from './components/rate/rate.component';

export const BuyerLayoutRoutingModule: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component:CartComponent },
  { path: 'orders', component:OrderHistoryComponent },
  { path: 'rate/:id/:lid', component:RateComponent },

];