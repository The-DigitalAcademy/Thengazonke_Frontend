import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivestockComponent } from '../components/create-livestock/livestock/livestock.component';
import { AdminOrderHistoryComponent } from '../components/order-history/admin-order-history/admin-order-history.component';
import { OrderHistoryModalComponent } from '../components/order-history/order-history-modal/order-history-modal.component';
import { ListUserComponent } from '../components/user/list-user/list-user.component';
import { UserModalComponent } from '../components/user/user-modal/user-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // { path: 'das', component: DashboardComponent },
  { path: '', component: ListUserComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'user/:id', component: UserModalComponent },
  { path: 'livestock', component: LivestockComponent },
  { path: 'order-history', component: AdminOrderHistoryComponent },
  { path: 'order-history/:id', component: OrderHistoryModalComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
