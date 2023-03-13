import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../buyer-layout/components/home/home.component';
import { OrderHistoryComponent } from '../buyer-layout/components/order-history/order-history.component';
import { RateComponent } from '../buyer-layout/components/rate/rate.component';
import { CreateLivestockComponent } from '../seller-layout/components/create-livestock/create-livestock.component';
import { HomePageComponent } from '../seller-layout/components/home-page/home-page.component';
import { OrderRequestComponent } from '../seller-layout/components/order-request/order-request.component';
import { ReviewComponent } from '../seller-layout/components/review/review.component';
import { CartComponent } from '../shared/cart/cart.component';
import { LandingComponent } from '../shared/landing/landing.component';
import { ProfileComponent } from '../shared/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'buyer', component: HomeComponent },
  { path: 'seller', component: HomePageComponent },
  { path: 'order-request', component: OrderRequestComponent },
  { path: 'orders', component:OrderHistoryComponent },
  { path: 'rate/:id/:lid', component:RateComponent },
  { path: 'livestock', component:CreateLivestockComponent },
  { path: 'livestock/:id', component:CreateLivestockComponent },
  { path: 'review', component:ReviewComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'cart', component:CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
