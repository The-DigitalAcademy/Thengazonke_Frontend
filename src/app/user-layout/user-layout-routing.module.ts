import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../components/buyer/homepage/homepage.component';
import { CreateLivestockComponent } from '../components/create-livestock/create-livestock.component';
import { LandingComponent } from '../components/landing/landing.component';
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { OrderRequestComponent } from '../components/order-request/order-request.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { MylivestockComponent } from '../components/seller/mylivestock/mylivestock.component';
import { NotificationsComponent } from '../notifications/notifications.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component:HomepageComponent },
  { path: 'order-request', component:OrderRequestComponent },
  { path: 'order-history', component:OrderHistoryComponent },
  { path: 'create-livestock', component:CreateLivestockComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'notification', component:NotificationsComponent },
  { path: 'homes', component:MylivestockComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }

// export const LayoutRoutes: Routes = [
//   {  path: '',      component: LandingComponent }
// ];