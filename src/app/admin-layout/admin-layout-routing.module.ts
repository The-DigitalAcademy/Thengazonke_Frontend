import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivestockComponent } from '../components/create-livestock/livestock/livestock.component';
import { AdminOrderHistoryComponent } from '../components/order-history/admin-order-history/admin-order-history.component';
import { OrderHistoryModalComponent } from '../components/order-history/order-history-modal/order-history-modal.component';
import { AdminRateAndReviewComponent } from '../components/rate/admin-rate-and-review/admin-rate-and-review.component';
import { UserReviewComponent } from '../components/rate/user-review/user-review.component';
import { ListUserComponent } from '../components/user/list-user/list-user.component';
import { UserModalComponent } from '../components/user/user-modal/user-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreedComponent } from './dashboard/breed/breed.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'user/:id', component: UserModalComponent },
  { path: 'livestock', component: LivestockComponent },
  { path: 'order-history', component: AdminOrderHistoryComponent },
  { path: 'order-history/:id', component: OrderHistoryModalComponent },
  { path: 'rate-review', component: AdminRateAndReviewComponent },
  { path: 'user-rate-review/:id', component: UserReviewComponent },
  { path: 'breed', component: BreedComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
